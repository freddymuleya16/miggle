import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { resetPassword } from '../actions/authActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const successMessage = useSelector(state => state.auth.successMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
   // dispatch(resetPassword(email));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit" disabled={isLoading}>Reset Password</button>
      {error && <p>{error.message}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}

export default ForgotPassword;
