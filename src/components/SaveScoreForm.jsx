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
      <label htmlFor="player-name" className="visually-hidden">
        Tu nombre
      </label>
      <div className="input-group">
        <input
          id="player-name"
          className="form-control"
          placeholder="Tu nombre (máx. 15)"
          value={name}
          maxLength={15}
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success font-pixel" type="submit" disabled={name.trim() === ""}>
          GUARDAR
        </button>
      </div>
    </form>
  );
};

export default SaveScoreForm;
