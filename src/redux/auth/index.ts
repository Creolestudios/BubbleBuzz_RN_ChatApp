import {createSlice} from '@reduxjs/toolkit';
import {UserModel} from '../../types/UserModel';
import {RootState} from '../store';

export interface AuthState {
  currentUser?: UserModel | null;
  isSubscribed: boolean;
}

const initialState: AuthState = {
  isSubscribed: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, data) => {
      const {payload} = data;
      
      
      state.currentUser = payload;
    },
  },
});

export const {onLogin} = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
