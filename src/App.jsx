import { useState, useEffect } from 'react'
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
    { id: 1, name: "Pasha", role: "Developer", avatar: pashaAvatar, important: false },
    { id: 2, name: "Lera", role: "2D Designer", avatar: leraAvatar, important: false} ,
    { id: 3, name: "Duck", role: "Business Duck", avatar: duckAvatar, important: false },
    {id: 4, name: "Shibo", role: "Important", avatar: shiboAvatar, important: false },
    {id: 5, name: "Deer", role: "Boss", avatar: olenAvatar, important: false }
  ]);


  useEffect(() => {
    const saved = localStorage.getItem("profiles");
  if (saved) setProfiles(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem("profiles", JSON.stringify(profiles));
}, [profiles]);

  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  // для формы
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Developer");
  const [isImportant, setImportant] = useState(false);
  const [errors, setErrors] = useState({name: "", role: ""});

  const validate = () => {
    const e = {name: "", role: ""};
    if (newName.trim().length < 2) e.name = "The name must be at least 2 characters long.";
    if (!newRole) e.role = "The role is mandatory";
    setErrors(e);
    return !e.name && !e.role;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()) return;


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
          onDelete={() => deleteProfile(profile.id)}
          />
        ))}

      </div>
      {/* форма добавления нового профиля */}
      <form onSubmit ={handleSubmit} className="add-form">
        <input
        className={errors.name ? "invalid" : ""}
        type="text"
        placeholder="Имя"
        value ={newName}
        onChange={(e) => { 
          setNewName(e.target.value); 
          if (errors.name) setErrors(prev => ({...prev, name: ""}))}}
        />
        {errors.name && <small className="error">{errors.name}</small>}

        <select 
          className={errors.role ? "invalid" : ""}
          value={newRole}
                onChange={(e) => { setNewRole(e.target.value);
                   if (errors.role) setErrors(prev => ({...prev, role: ""}))}}
                >
          <option value="Developer">Developer</option>
          <option value="2D Designer">2D Designer</option>
          <option value="Business Duck">Business Duck</option>
          <option value="Manager">Manager</option>
          <option value="QA">QA</option>
        </select>
        {errors.role && <small className="error">{errors.role}</small>}

        <label>
          <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setImportant(e.target.checked)}
          />
          Important
        </label>

        <button type ="submit" disabled={!newName.trim() || !newRole}>
          Add Profile
        </button>
      </form>
    </main>
    );
}

export default App;
