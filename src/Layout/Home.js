import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

export default function Home() {
  const [decks, setDecks] = useState([]);
 

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const decksFromAPI = await listDecks(abortController.signal);
        
        setDecks(decksFromAPI);
      } catch (e) {
        console.log(e);
      }
    }
    getDeck();
     return () => abortController.abort()
  }, []);

  

  

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">+ Create Deck </button>
      </Link>
      
      {decks.map((deck) => (
       <DeckList deck={deck} key={deck.id}/>
      ))}
    </div>
  );
}
