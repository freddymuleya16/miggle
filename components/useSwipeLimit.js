
import { useEffect, useState } from 'react'
import { db } from '@/utils/firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getChatDocument, isSubscribed } from '@/utils/helpers'
import { getAuth } from 'firebase/auth'
import { addNotification } from '@/actions/notificationActions'
import { toast } from 'react-toastify'
import { isToday } from 'date-fns'

function useSwipeLimit(user, dailyLimit) {
    const [remainingSwipes, setRemainingSwipes] = useState(dailyLimit);
    const [canSwipe, setCanSwipe] = useState(true);
    const [potentialMatches, setPotentialMatches] = useState([]);

    useEffect(() => {
        const resetDailyLimit = () => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);

            if (midnight <= now) {
                setRemainingSwipes(dailyLimit);
                setCanSwipe(true);
            }
        };

        // Calculate the time remaining until midnight
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight - now;

        const timer = setTimeout(() => {
            resetDailyLimit();
        }, timeUntilMidnight);

        return () => {
            clearTimeout(timer);
        };
    }, [dailyLimit]);

    useEffect(() => {
        const filteredMatches = potentialMatches.filter((potentialMatch) => {


            return true; // Return true for matches that meet your criteria
        });
        const swipesMadeToday = user.dailyLimit?.date ? isToday(user.dailyLimit.date) ? user.dailyLimit.number : 0 : 0;
        if (swipesMadeToday >= dailyLimit) {
            setCanSwipe(false);
        } else {
            setCanSwipe(true);
        }

        setRemainingSwipes(dailyLimit - swipesMadeToday);
    }, [potentialMatches, remainingSwipes, dailyLimit]);

    const swipe = async (swipeType, matchId) => {
        if (canSwipe || isSubscribed(user)) {
            const usersCollection = collection(db, "users");
            const userId = getAuth().currentUser.uid;
            const userDoc = doc(usersCollection, userId);
            const userSnapshot = await getDoc(userDoc);
            const userData = userSnapshot.data();

            console.log("increment", userData?.dailyLimit?.number ? userData?.dailyLimit?.number + 1 : 1)
            const updatedData = {
                dailyLimit: {
                    number: userData?.dailyLimit?.number ? userData?.dailyLimit?.number + 1 : 1,
                    date: new Date()
                },
                swipingHistory: {
                    [matchId]: swipeType,
                    ...(userData.swipingHistory || {}),
                },
            };

            user.swipingHistory = updatedData.swipingHistory
            user.dailyLimit = updatedData.dailyLimit;

            await updateDoc(userDoc, updatedData);

            // Check if the user swipeTyped right and the match also swipeTyped right
            if (swipeType === "like") {
                const matchDoc = doc(usersCollection, matchId);
                const matchDocSnapshot = await getDoc(matchDoc);
                const matchDocData = matchDocSnapshot.data();
                if (
                    matchDocData.swipingHistory &&
                    matchDocData.swipingHistory[userId] === "like"
                ) {
                    // Update both users' matches arrays
                    const userMatches = userData.matches
                        ? [...userData.matches, { matchId, matchDate: new Date() }]
                        : [{ matchId, matchDate: new Date() }];
                    const matchMatches = matchDocData.matches
                        ? [...matchDocData.matches, { userId, matchDate: new Date() }]
                        : [{ userId, matchDate: new Date() }];
                    const updatedUserData = { matches: userMatches };
                    const updatedMatchData = { matches: matchMatches };

                    await updateDoc(userDoc, updatedUserData);
                    await updateDoc(matchDoc, updatedMatchData);
                    const chatID = await getChatDocument(userId, matchId);
                    console.log(chatID, '-created chat')
                    // Display match success message
                    const fullName = `${matchDocData.firstName} ${matchDocData.lastName}`;
                    toast.success(`Matched with ${fullName}`);
                    dispatch(
                        addNotification(matchId, "New Match", `You matched with ${userData.firstName} ${userData.lastName}`)
                    );
                    dispatch(
                        addNotification(userId, "New Match", `You matched with ${fullName}`)
                    );
                }
                // Remove match from potential matches and display next match (if available)
                setPotentialMatches((matches) => {
                    const remainingMatches = matches.filter((match) => match.id !== matchId);
                    return remainingMatches;
                });
            }
            // Update remaining swipes and prevent further swiping if necessary
            setRemainingSwipes((prevRemainingSwipes) => prevRemainingSwipes - 1);
            if (remainingSwipes <= 1) {
                setCanSwipe(false);
            }
        }
    };

    return { remainingSwipes, canSwipe, swipe, potentialMatches, setPotentialMatches };
}

export default useSwipeLimit;
