import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/components/PaymentForm';
import { withAuth } from '@/utils/withAuth';
import { useSelector } from 'react-redux';
import OverLayLoading from '@/components/OverLayLoading';
import { useEffect } from 'react';
import { isSubscribed } from '@/utils/helpers';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const SubscriptionPage = ({ user }) => {
    const premiumFeatures = [ 
        "Advanced search filters",
        "Unlimited likes/swipes",
        "Exclusive messaging privileges", 
    ];

    const isLoading = useSelector((state) => state.auth.isLoading);

    const router = useRouter();
    const subscriptionPrice = "$9.99/month"; // Replace with your actual pricing



    useEffect(() => {
        const handleSubscriptionSuccess = () => {
            if (isSubscribed(user)) {
                // User is subscribed, so redirect to another page
                router.push('/'); // Redirect to the dashboard page
            } else {
                // Handle the case where the user is not subscribed (optional)
                console.log('User is not subscribed.');
                // You can display a message or perform other actions as needed.
            }
        };
        // Simulate a successful subscription (replace with your actual logic)
        handleSubscriptionSuccess();
    }, [router, user]);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">

            {isLoading && <OverLayLoading />}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Upgrade to Premium</h1>
                <p className="text-gray-600 mb-4">
                    Unlock the following premium features:
                </p>
                <ul className="list-disc ml-6 mb-4">
                    {premiumFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                </ul>
                <p className="text-lg font-semibold text-rose-500 mb-4">
                    Price: {subscriptionPrice} per month
                </p>
                <div className="mb-6">
                    <Elements stripe={stripePromise}>
                        <PaymentForm user={user} />
                    </Elements>
                </div>
                <p className="text-sm text-gray-500">
                    Secure payment processing powered by Stripe.
                </p>
            </div>
        </div>
    );
};

export default withAuth(SubscriptionPage);
