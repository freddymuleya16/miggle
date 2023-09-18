import { markAsSubscribed } from '@/actions/subcriptionActions';
import { setLoading } from '@/reducers/authSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function PaymentForm({ user }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(setLoading(true))

      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      // Create a PaymentMethod
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });


      if (error) {
        console.error(error);
      } else {
        // Send the paymentMethod.id to your server for payment processing
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: 999, fullname: `${user.firstName} ${user.lastName}`, email: user.email }), // Adjust the amount as needed
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Handle a successful payment response
          console.log('Payment successful', response);
          dispatch(markAsSubscribed()).then(() => {

            toast.success(`You have successfully subscribed to mingle`);
            router.push('/')
          })
        } else {
          // Handle a failed payment response
          console.error('Payment failed', response);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false))

    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="btn-fill bg-rose-500 hover:bg-rose-600 m-3  ml-auto text-white font-bold py-2 px-4 rounded-md mb-4 focus:outline-none"
      >
        Pay
      </button>
    </form>
  );
}

export default PaymentForm;
