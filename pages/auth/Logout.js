import { logout } from '@/actions/authActions';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  }

  return (
    <button onClick={handleClick}>Log Out</button>
  );
}

export default Logout;
