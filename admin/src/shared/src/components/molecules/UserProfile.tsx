const UserProfile = () => {
  // Replace 'username' and 'profile-image.png' with actual data from the authenticated user
  return (
    <div className="user-profile">
      <span>Username</span>
      <img src="profile-image.png" alt="Profile" />
    </div>
  );
};

export default UserProfile;
