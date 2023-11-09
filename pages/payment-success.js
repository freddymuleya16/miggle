import { useRouter } from 'next/router';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const { query } = router;
console.log(query)
  // Access the query parameters and perform any necessary actions
  // For example, update the user's subscription status, display a success message, etc.

  return (
    <div>
      <h1>Payment Successful</h1>
      {/* Display success message or relevant content */}
    </div>
  );
};

export default PaymentSuccessPage;
