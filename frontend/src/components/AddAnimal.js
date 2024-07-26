import React, { useState } from "react";
import axios from "axios";

function AddAnimal() {
  const [tier, setTier] = useState({
    tierart: "",
    name: "",
    krankheit: "",
    geburtstag: "",
    gewicht: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/tiere", tier);
      alert("Tier wurde erfolgreich gespeichert")
      setTier({
        tierart: "",
        name: "",
        krankheit: "",
        geburtstag: "",
        gewicht: "",
      });
    } catch (error) {
      console.error("Fehler beim speichern", error);
    }
  }

  function handleChange(event) {
    setTier({ ...tier, [event.target.name]: event.target.value });
  }
  return (
    <div className="add-animal">
      <h2> Neues Tier hinzufügen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tierart"
          value={tier.tierart}
          onChange={handleChange}
          placeholder="Tierart"
        ></input>
        <input
          name="name"
          value={tier.name}
          onChange={handleChange}
          placeholder="Name"
        ></input>
        <input
          name="krankheit"
          value={tier.krankheit}
          onChange={handleChange}
          placeholder="Krankheit"
        ></input>
        <input
          name="geburtstag"
          value={tier.geburtstag}
          onChange={handleChange}
          placeholder="Geburtstag"
        ></input>
        <input
          name="gewicht"
          value={tier.gewicht}
          onChange={handleChange}
          placeholder="Gewicht"
        ></input>
        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}

export default AddAnimal;
