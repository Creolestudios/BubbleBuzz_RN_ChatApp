import {extractData, userAuthFetch, userRawFetch} from './server';

export const signIn = (data: any) =>
  userAuthFetch.post('/register', data).then(extractData); // Update here /register

export const getArchitectWorkTypes = () =>
  userAuthFetch.get('/').then(extractData); //update here

export const logout = () => userAuthFetch.post('/logout').then(extractData);
