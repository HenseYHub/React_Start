function ProfileCard({name, role, avatar, onDelete}) {
    return (
        <article className="profile-card">
            <img src={avatar} alt={name} />
            <h2>{name}</h2>
            <p>{role}</p>
            <button type="button" onClick={onDelete}>Удалить</button>
        </article>
    );
}

export default ProfileCard