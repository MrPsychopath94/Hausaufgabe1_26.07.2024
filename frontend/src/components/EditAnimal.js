import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"

function EditAnimal() {

    const navigate = useNavigate()
    const [tier, setTier] = useState({
        tierart: "",
        name: "",
        krankheit: "",
        geburtstag: "",
        gewicht: ""
    })
    const {id} = useParams()
    // console.log(id)

    useEffect(() => {
        getOneTier()
    }, [])

    async function getOneTier(){
        try {
            const response = await axios.get(`http://localhost:3000/tiere/${id}`);
            setTier(response.data)
          } catch (error) {
            console.error("Fehler beim fetchen des Tieres", error);
          }
    }
    // console.log(tier)


    async function handleSubmit(event){
        event.preventDefault()
        try{
            await axios.put(`http://localhost:3000/tiere/${id}`, tier)
            alert("Aktualisierung erfolgreich, sie werden nun auf die Hauptseite weitergeleitet")
            navigate("/list")
        }catch (error){
            console.error("Fehler beim akutalisieren", error)
        }
        
    }

    function handleChange(event){
       setTier({...tier, [event.target.name]: event.target.value})

    }
  return (
    <div className='edit-animal'>
        <h2> {tier.name} bearbeiten</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="tierart" value={tier.tierart} onChange={handleChange} placeholder='Tierart'></input>
            <input name="name" value={tier.name} onChange={handleChange} placeholder='Name'></input>
            <input name="krankheit" value={tier.krankheit}  onChange={handleChange} placeholder='Krankheit'></input>
            <input name="geburtstag" value={tier.geburtstag} onChange={handleChange} placeholder='Geburtstag'></input>
            <input name="gewicht" value={tier.gewicht} onChange={handleChange} placeholder='Gewicht'></input>
            <button type="submit">Aktualisieren</button>
        </form>



    </div>
  )
}

export default EditAnimal