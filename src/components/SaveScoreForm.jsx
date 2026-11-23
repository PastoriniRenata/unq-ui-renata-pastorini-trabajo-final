import { useState } from "react";

const SaveScoreForm = ({ onSave }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") return;
    onSave(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="player-name">¡Entraste al ranking! Escribí tu nombre</label>
      <input
        id="player-name"
        value={name}
        maxLength={15}
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-success" type="submit" disabled={name.trim() === ""}>
        Guardar
      </button>
    </form>
  );
};

export default SaveScoreForm;