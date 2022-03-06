import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export default function DeckList({ deck }) {
  const { cards } = deck;
  const history = useHistory();

  const deleteDeckHandler = async () => {
    const { signal } = new AbortController();
    const confirm = window.confirm(
      "Delete this Deck? You will not be able to recover it."
    );

    if (confirm) {
      await deleteDeck(deck.id, signal);
      history.go(0);
    }
  };

  return (
    <div key={deck.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p>{cards.length} cards</p>
          <h6>{deck.description}</h6>

          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary">View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary m-1">Study</button>
          </Link>
          <button className="btn btn-danger" onClick={deleteDeckHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
