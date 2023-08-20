// pages/get-premium.js

import React from 'react';
import Link from 'next/link';
import { withAuth } from '@/utils/withAuth';
import { identifier } from '@/utils/helpers';

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
                onClick={() => {
                    window.payfast_do_onsite_payment({ "uuid": identifier }, function (result) {
                        if (result === true) {
                            // Payment Completed
                            console.log('subscribed successfully')
                        }
                        else {
                            console.log('subscribed unsuccessfully')
                            // Payment Window Closed
                        }
                    });
                }}
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
