import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function AnimalList() {
  const [tiere, setTiere] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTiere();
  }, []);

  async function getAllTiere() {
    try {
      const response = await axios.get("http://localhost:3000/tiere");
      setTiere(response.data);
    } catch (error) {
      console.error("Fehler beim fetchen der Tiere", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/tiere/${id}`);
      getAllTiere();
    } catch (error) {
      console.error("Fehler beim löschen", error);
    }
  }
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const filteredTiere = tiere.filter(
    (tier) =>
      tier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tier.tierart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tier.krankheit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animal-list">
      <h2>Alle Tiere</h2>
      <input
        value={searchTerm}
        type="text"
        placeholder="Tiere Suchen.."
        onChange={handleSearch}
      ></input>

      <ul>
        {filteredTiere.map((tier) => (
          <li key={tier.id}>
            {tier.name} ({tier.tierart}) : {tier.krankheit}, {tier.geburtstag},{" "}
            {tier.gewicht}kg
            <Link to={`/editAnimal/${tier.id}`}>Bearbeiten</Link>
            <button onClick={() => handleDelete(tier.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimalList;
