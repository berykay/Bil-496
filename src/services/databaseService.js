import { getCurrentUserId } from './authService.js';

let userInfo = null;

const getUserInfo = async () => {
  if (!userInfo) {
    console.log('User information not found. Fetching...');
    userInfo = await fetchUserInfo();
  }
  return userInfo;
};

const getIsNewUser = async () => {
  if (!userInfo) {
    console.error('User information not found.');
    userInfo = await fetchUserInfo();
  }
  return userInfo.then((response ) => response .json()).then((data ) => data );
};

const fetchUserInfo = async () => {
    console.log('Fetching user information...');
    const userId = getCurrentUserId();
    if (!userId) {
      console.error('No user is currently signed in.');
      return;
    }
  
    try {
      const response = await fetch(`/api/user?userID=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userInfo = await response.json();
      console.log('User information retrieved:', userInfo);
      return userInfo;
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  };



export { getUserInfo, getIsNewUser };