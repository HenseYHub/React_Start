import { useState } from 'react'
import './App.css'
import ProfileCard from './ProfileCard'
import pashaAvatar from './assets/ItsMe.jpg'
import leraAvatar  from './assets/ItsLera.jpg'
import duckAvatar  from './assets/Duck.png'
import shiboAvatar  from './assets/Shibo.png'
import olenAvatar from "./assets/Olen.jpg";
import newUserAvatar from "./assets/New_User.jpg";

// компонент приложения
function App() {
  const [profiles, setProfiles] = useState ([
    { id: 1, name: "Pasha", role: "Developer", avatar: pashaAvatar },
    { id: 2, name: "Lera", role: "2D Designer", avatar: leraAvatar },
    { id: 3, name: "Duck", role: "Business Duck", avatar: duckAvatar },
    {id: 4, name: "Shibo", role: "Manager", avatar: shiboAvatar },
    {id: 5, name: "Deer", role: "Director", avatar: olenAvatar }
  ]);

  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  // для формы
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [isImportant, setImportant] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const startEdit = (id) => setEditingId(id);
const cancelEdit = () => setEditingId(null);

const saveEdit = (id, fields) => {
  // fields = { name, role, important }
  setProfiles(prev =>
    prev.map(p => p.id === id ? { ...p, ...fields } : p)
  );
  setEditingId(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newName.trim()) return;


    // создаем новый профиль
    const newProfile = {
      id: Date.now(),
      name: newName,
      role: newRole,
      important: isImportant,
      avatar: newUserAvatar
    };

// добавляем новый профиль в список
    setProfiles((prev) => [...prev, newProfile]);
    setNewName("");
    setNewRole("Developer");
    setImportant(false);
    }

    // рендерим
  return (
    <main>
      <h1>Team Profiles</h1>
      
      {/* список карточек */}
      <div className="profile-list">
        {profiles.map(profile => (
          <ProfileCard
          key={profile.id}
          name={profile.name}
          role={profile.role}
          avatar={profile.avatar}
          important={profile.important}
          isEditing={editingId === profile.id}
          onEdit={() => startEdit(profile.id)}
          onCancel={cancelEdit}
          onSave={(fields) => saveEdit(profile.id, fields)}
          onDelete={() => deleteProfile(profile.id)}
          />
        ))}

      </div>
      {/* форма добавления нового профиля */}
      <form onSubmit ={handleSubmit} className="add-form">
        <input
        type="text"
        placeholder="Имя"
        value ={newName}
        onChange={(e) => setNewName (e.target.value)}
        />

        <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
          <option value="Developer">Developer</option>
          <option value="2D Designer">2D Designer</option>
          <option value="Business Duck">Business Duck</option>
          <option value="Manager">Manager</option>
          <option value="QA">QA</option>
        </select>

        <label>
          <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setImportant(e.target.checked)}
          />
          Важный
        </label>

        <button type="submit">Add Profile</button>
      </form>
    </main>
    );
}

export default App;
