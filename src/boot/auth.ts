import { boot } from 'quasar/wrappers';
import auth from '../context/authContext';

export default boot(() => {
  auth.initializeAuth();
});