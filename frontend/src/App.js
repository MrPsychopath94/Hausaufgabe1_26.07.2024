import logo from './logo.svg';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import './App.css';
import AnimalList from './components/AnimalList';
import EditAnimal from './components/EditAnimal';
import AddAnimal from './components/AddAnimal';
import SideBar from './components/SideBar';

function App() {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path="/" element={<AnimalList />}/> 
        <Route path="/list" element={<AnimalList />}/> 
        <Route path="/editAnimal/:id" element={<EditAnimal />}/> 
        <Route path="/addAnimal" element={<AddAnimal />}/> 

      </Routes>


    </Router>
  );
}

export default App;
