const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, bio } = user || {};
  return (
    <div className="card bg-base-300 w-96 shadow-sm ">
      <img src={photoUrl} alt="User profile" />

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p>
            {age} years, {gender}
          </p>
        )}
        <p>{bio}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignored</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
