import React, { useState, useEffect } from "react";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";

export default function DeckView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const { id, name, description, cards } = deck;
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const { signal } = new AbortController();
    async function loadDeck() {
      try {
        const cardsFromAPI = await readDeck(deckId, signal);

        setDeck(cardsFromAPI);
      } catch (e) {
        console.log(e);
      }
    }
    loadDeck();
    // return AbortController.abort()
  }, [deckId]);

  const deleteDeckHandler = async () => {
    const { signal } = new AbortController();
    const confirm = window.confirm(
      "Delete this Deck? You will not be able to recover it."
    );

    if (confirm) {
      await deleteDeck(id, signal);
      history.push("/");
    } else {
      history.go(0);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >{`${name}`}</li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-body">
          <h2>{name}</h2>
          <p>{description}</p>
          <Link to={`/decks/${id}/edit`}>
            <button className="btn btn-secondary m-1">Edit</button>
          </Link>
          <Link to={`/decks/${id}/study`}>
            <button className="btn btn-primary m-1">Study</button>
          </Link>
          <Link to={`/decks/${id}/cards/new`}>
            <button className="btn btn-primary m-1">Add Cards</button>
          </Link>
          <button onClick={deleteDeckHandler} className="btn btn-danger ">
            Delete
          </button>
        </div>
      </div>
      {cards && (
        <div>
          <h1>Cards</h1>

          {cards.map((card, index) => (
            <div key={card.id}>
              <div className="card">
                <div className="card-body">
                  <p>{card.front}</p>
                  <p>{card.back}</p>
                  <Link to={`${url}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary m-1">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this card? You will not able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
