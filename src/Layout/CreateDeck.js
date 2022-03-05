import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  //const { deckId, updatedDeck } = useParams()
  const history = useHistory();
  // const { url } = useRouteMatch()
  const [deck, setDeck] = useState({ name: "", description: "" });

  const changeForm = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    console.log("submit");
    const { signal } = new AbortController();
    event.preventDefault();
    const response = await createDeck(deck, signal);
    console.log(response.id);
    setDeck({ name: "", description: "" });
    history.push(`/decks/${response.id}`);
  };

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <h1>Create Deck</h1>
      <form onSubmit={submitForm}>
        <div className= "form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Deck Name"
            name="name"
            value={deck.name}
            onChange={changeForm}
            className="form-control"
          ></input>
        </div>
        <label >Description</label>
        <textarea
          name="description"
          type="text"
          placeholder="Brief description of the deck"
          value={deck.description}
          onChange={changeForm}
          className="form-control"
        ></textarea>
        <Link to={`/`} name="cancel" className="btn btn-secondary" >
          Cancel
        </Link>
     
        <button
          type="submit"
          className="btn btn-primary"
        >Submit</button>
      
      </form>
    </div>
  );
}
