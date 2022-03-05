import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  // const [card, setCard] = useState({ front: "", back: ""});

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
    //return abortController.abort()
  }, [deckId]);

 

  return (
    <div>
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
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <h1>{`${deck.name}: Add Card`}</h1>
      <CardForm />
      
    </div>
  );
}
