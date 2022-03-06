import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", decription: "" });
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const cardsFromAPI = await readDeck(deckId, abortController.signal);
        console.log(cardsFromAPI);
        setDeck(cardsFromAPI);
      } catch (e) {
        console.log(e);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const changeForm = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const response = updateDeck(deck);
    console.log(deck);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              {" "}
              <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>

        <h1>Edit Deck</h1>
      </div>
      <form onSubmit={submitForm}>
        <div className="form-group">

        <label>Name</label>
        <input
          type="text"
          required
          name="name"
          value={deck.name}
          onChange={changeForm}
          id="name"
          className="form-control"
        />
        <div>
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            required
            value={deck.description}
            onChange={changeForm}
            className="form-control"
          ></textarea>
        </div>
        <Link to={`/decks/${deck.id}`}>
          <button className="btn btn-secondary m-1">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
