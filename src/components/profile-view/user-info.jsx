
function UserInfo({ username, email, birthday }) {
  const formattedBirthday = new Date(birthday);
  const month = formattedBirthday.toLocaleString('default', { month: 'long' });
  const day = formattedBirthday.getDate();
  const year = formattedBirthday.getFullYear();
    
  return (
    <>
      <h4>User Info</h4>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {`${month} ${day}, ${year}`} </p>
    </>
  );
}
export default UserInfo;