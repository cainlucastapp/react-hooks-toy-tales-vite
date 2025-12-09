import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Toys state
  const [toys, setToys] = useState([])

  // Get toys
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => {
        if (!r.ok) {throw new Error("failed to get toys") }
        return r.json()
      })
      .then(setToys)
      .catch(error => console.log(error.message))
  }, []);

  // Handler to update state with new toy
  const addToy = (newToy) => {
    setToys([...toys, newToy]);
  }

  // Delete toy
  const deleteToy = (id) => {
    setToys(toys.filter(toy => toy.id !== id));
  }

  // Update toy
  const updateToy = (updatedToy) => {
  setToys(toys.map(toy => 
    toy.id === updatedToy.id ? updatedToy : toy
  ));
}


  return (
    <>
      <Header />
       {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy} />
    </>
  );
}

export default App;
