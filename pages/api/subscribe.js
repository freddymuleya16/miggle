const stripe = require('stripe')('sk_test_51NhEtZBq3YClo4F39rcFKIpoBcNRaza9GY9i7Vi3SElhoFCDtBO7h0O152iIRRYKXrnxbqpgDuyk3dlgcjqcY6VA00VQfQpYV8');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { paymentMethodId, amount,email,fullname } = req.body;

        try {
            const customers = await stripe.customers.list({
                email: email
            });
            let customer;

            if (customers.data.length > 0) {
                customer = customers.data[0]
                console.log('customer from stripe:', customer.email)
            } else {
                customer = await stripe.customers.create({
                    description: 'Mingle Customer',
                    email: email,
                    name: fullname, 
                });
                console.log('new customer:', customer.email)
            }

            const intent = await stripe.paymentIntents.create({
                amount:amount,
                currency:'usd',
                confirm:true,
                customer:customer.id,
                receipt_email:email,
                statement_descriptor:"Mingle Subsciption",
                automatic_payment_methods: {enabled: true,allow_redirects:'never'}, 
                payment_method: paymentMethodId
            })
            
            
            res.status(200).json({ success: intent.status});

        } catch (error) {
            // Handle payment failure and send an error response to the client
            console.error(error);
            res.status(500).json({ error: 'Payment failed' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}