import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import CardList from "./CardList";

export default function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const cardsFromAPI = await readDeck(deckId, abortController.signal);
        
        setDeck(cardsFromAPI);
      } catch (e) {
        console.log(e);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {`${deck.name}`}</h1>
      <CardList cards={deck.cards} />
    </div>
  );
}
