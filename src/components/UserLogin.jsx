export const handleGetUserData = () => {
  const userData = localStorage.getItem("User");
  const userIn = JSON.parse(userData);
  if (userIn && userIn.enable === true) {
    return userIn;
  }
};
