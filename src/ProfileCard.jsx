import {useState, useEffect} from "react";

function ProfileCard({id, name, role, avatar, important, isEditing, onEdit, onCancel, onSave, onDelete}) {
    const [draftName, setDraftName] = useState(name);
    const [draftRole, setDraftRole] = useState(role);
    const [draftImportant, setDraftImportant] = useState(Boolean(important));

    useEffect(() => {
        if(isEditing) {
            setDraftName(name);
            setDraftRole(role);
            setDraftImportant(Boolean(important));
        }
    }, [isEditing, name, role, important]);

    if (isEditing) {
        return (
            <article className="profile-card editing">
                <img src={avatar} alt={name} />
                <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="Name"
                />
                <select
                    value={draftRole}
                    onChange={(e) => setDraftRole(e.target.value)}
                    >
                        <option value = "Developer">Developer</option>
                        <option value = "2D Designer">Designer</option>
                        <option value = "Manager">Manager</option>
                        <option value = "Business Duck">Business Duck</option>
                        <option value = "QA">QA</option>
                </select>

                <label>
                    <input 
                    type = "checkbox"
                    checked={draftImportant}
                    onChange={(e) => setDraftImportant(e.target.checked)}
                    />
                    Important
                </label>

                <div className="actions">
                    <button
                    onClick={() => onSave({
                        name: draftName,
                        role: draftRole,
                        important: draftImportant
                    })
                }
                disabled={!draftName.trim()}
                >
                    Save
                </button>
                <button onClick={onCancel}>Cancel</button>
                </div>
            </article>
        );
    }

    return (
        <article className={`profile-card ${important ? "important" : ""}`}>
            <img src={avatar} alt={name} />
            <h2>{name} {important && "⭐"}</h2>
            <p>{role}</p>
            <div className="actions">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
            </article>
    );
}
      

export default ProfileCard