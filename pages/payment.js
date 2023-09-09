// pages/get-premium.js

import React from 'react';
import Link from 'next/link';
import { withAuth } from '@/utils/withAuth';
import { identifier } from '@/utils/helpers';

import axios from "axios";
const crypto = require("crypto");

const PremiumPlanCard = ({ title, price, features, user }) => {
    return (
        <div className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="text-gray-600 mb-4">
                <p className="text-2xl font-bold">R{price}</p>
                <p>per month</p>
            </div>
            <ul className="list-disc list-inside">
                {features.map((feature, index) => (
                    <li key={index} className="mb-2">
                        {feature}
                    </li>
                ))}
            </ul>
            <form action=" https://sandbox.payfast.co.za​/eng/process" method="post">
                <input type="hidden" name="merchant_id" value="10030696" />
                <input type="hidden" name="merchant_key" value="mrxb3svcao6ne" />
                <input type="hidden" name="amount" value={price} />
                <input type="hidden" name="item_name" value={title} />
                <input type="hidden" name="name_first" value={user.firstname} />
                <input type="hidden" name="name_last" value={user.lastname} />
                <input type="hidden" name="email_address" value={user.email} />
                <input type="hidden" name="return_url" value={process.env.NEXT_PUBLIC_URLROOT + "payment-success"} />
                <input type="hidden" name="cancel_url" value={process.env.NEXT_PUBLIC_URLROOT + "payment-success"} />


            </form>
            <button
                onClick={paymentHandler}
                type='submit' className="btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4 focus:outline-none        mt-4   inline-block   transition duration-300">
                Upgrade Now

            </button>

        </div>
    );
};

const GetPremiumPage = ({ user }) => {
    const premiumPlans = [
        {
            title: 'Gold Membership',
            price: '19.99',
            features: [
                'Unlimited messaging',
                'Advanced search filters',
                'Enhanced profile visibility',
                'Priority customer support',
            ],
        },
        {
            title: 'Platinum Membership',
            price: '29.99',
            features: [
                'All Gold Membership features',
                'Exclusive access to premium events',
                'Profile boosts',
            ],
        },
        {
            title: 'Diamond Membership',
            price: '49.99',
            features: [
                'All Platinum Membership features',
                'Personalized matchmaking',
                'Featured profile placement',
            ],
        },
        // Add more plans here
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-3xl mx-auto my-auto">
                <h1 className="text-4xl font-semibold mb-6 text-center">
                    Upgrade to Premium
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {premiumPlans.map((plan, index) => (
                        <PremiumPlanCard key={index} {...plan} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withAuth(GetPremiumPage);


const generateSignature = (data, passPhrase = null) => {
    // Create parameter string
    let pfOutput = "";
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] !== "") {
                pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
            }
        }
    }

    // Remove last ampersand
    let getString = pfOutput.slice(0, -1);
    if (passPhrase !== null) {
        getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
    }

    return crypto.createHash("md5").update(getString).digest("hex");
};
const paymentHandler = async () => {

    const myData = {
        "merchant_id": "10030696",
        "merchant_key": "mrxb3svcao6ne",
        email_address: "fredrixten@gmail.com"
    };
    const passPhrase = 'jt7NOE43FZPn';

    const dataToString = (dataArray) => {
        // Convert your data array to a string
        let pfParamString = "";
        for (let key in dataArray) {
            if (dataArray.hasOwnProperty(key)) { pfParamString += `${key}=${encodeURIComponent(dataArray[key].trim()).replace(/%20/g, "+")}&`; }
        }
        // Remove last ampersand
        return pfParamString.slice(0, -1);
    };

    const generatePaymentIdentifier = async (pfParamString) => {
        const result = await axios.post(`https://sandbox.payfast.co.za/onsite/​process`, pfParamString)
            .then((res) => {
                return res.data.uuid || null;
            })
            .catch((error) => {
                console.error(error)
            });
        console.log("res.data", result);
        return result;
    };

    // Generate signature (see Custom Integration -> Step 2)
    myData["signature"] = generateSignature(myData, passPhrase);

    // Convert the data array to a string
    const pfParamString = dataToString(myData);

    // Generate payment identifier
    const identifier = await generatePaymentIdentifier(pfParamString);
    console.log("Identifier", identifier)
}