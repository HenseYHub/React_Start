function ProfileCard({ name, role, avatar, important, onDelete }) {
  return (
    <article className={`profile-card ${important ? "important" : ""}`}>
      <img src={avatar} alt={name} />
      <h2>{name} {important && "⭐"}</h2>
      <p>{role}</p>
      <button onClick={onDelete}>Удалить</button>
    </article>
  );
}

export default ProfileCard  