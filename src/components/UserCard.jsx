const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender } = user || {};
  console.log({ user });
  return (
    <div className="card bg-base-300 w-96 shadow-sm py-5">
      <figure>
        <img src={photoUrl} alt="User profile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p>
            {age} years, {gender}
          </p>
        )}
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignored</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
