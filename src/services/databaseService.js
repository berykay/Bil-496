import Cookies from "js-cookie";
import { getCurrentUserId } from "./authService.js";

let userInfo = null;

const getUserInfo = async () => {
  if (!userInfo) {
    console.log("User information not found. Fetching...");
    userInfo = await fetchUserInfo();
  }
  return userInfo;
};

const fetchUserInfo = async () => {
  console.log("Fetching user information...");
  const userCookie = Cookies.get("user");
  if (!userCookie) {
    return;
  }

  let userId = getCurrentUserId();
  while (!userId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    userId = getCurrentUserId();
  }

  try {
    const response = await fetch(`/api/user?userID=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userInfo = await response.json();
    console.log("User information retrieved:", userInfo);
    return userInfo;
  } catch (error) {
    console.error("Failed to fetch user information:", error);
  }
};

const updateUserInfo = async (formData) => {
  const userID = getCurrentUserId();
  if (!userID) {
    throw new Error("No user is currently signed in.");
  }
  try{
    const response = await fetch(`/api/user?userID=${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Failed to update user information:", error);
    throw new Error("Failed to update user information");
  }
};

export { getUserInfo, updateUserInfo };
