import { setUser, setLoading, setError } from './authSlice';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";

export const signup = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  const auth = getAuth();
  dispatch(setLoading(true));
  try {
    await auth.signOut();
    dispatch(setUser(null));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};