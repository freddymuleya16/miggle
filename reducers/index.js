
import { combineReducers } from 'redux';
import authSlice from '@/reducers/authSlice';
import modelSlice from '@/reducers/modelSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  model:modelSlice
});

export default rootReducer;