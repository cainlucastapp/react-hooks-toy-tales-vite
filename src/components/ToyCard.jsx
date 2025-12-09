import React from "react";

function ToyCard({ id, name, image, likes, deleteToy, updateToy }) {
  
  // Update toy likes
  const handleLike = () => {
    fetch(`http://localhost:3001/toys/${id}`, {  // ← Don't forget the /
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1  // ← Increment likes
      })
    })
      .then(r => {
        if (!r.ok) { throw new Error("failed to update likes") }
        return r.json()
      })
      .then(updatedToy => updateToy(updatedToy))  // ← Update state
      .catch(error => console.log(error.message))
  }


  // Delete toy
  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (!r.ok) { throw new Error("failed to delete toy") }
        deleteToy(id);
      })
      .catch(error => console.log(error.message))
  }
  
  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;