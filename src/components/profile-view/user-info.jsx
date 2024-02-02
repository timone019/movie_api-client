function UserInfo({ username, email, birthday, fullname }) {
  const formattedBirthday = new Date(birthday);
  const month = formattedBirthday.getUTCMonth();
  const day = formattedBirthday.getUTCDate();
  const year = formattedBirthday.getUTCFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[month];
    
  return (
    <>
      <h3><strong>Hello</strong></h3>
      <h5><strong>{fullname}</strong></h5>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {`${monthName} ${day}, ${year}`} </p>
    </>
  );
}
export default UserInfo;