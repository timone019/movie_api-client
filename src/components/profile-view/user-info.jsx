
function UserInfo({ username, email, birthday }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday} </p>
    </>
  );
}
export default UserInfo;