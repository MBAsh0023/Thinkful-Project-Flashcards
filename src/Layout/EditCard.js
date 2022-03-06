import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  // const { url } = useRouteMatch();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
  // const { id, name, cards } = deck;
  const [card, setCard] = useState({ front: "", back: "" });
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCard() {
      try {
        const apiCard = await readCard(cardId, abortController.signal);
        console.log(apiCard);
        setCard(apiCard);
      } catch (e) {
        console.log(e);
      }
    }
    loadCard();
    // return abortController.abort()
  }, [cardId]);

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
    // return abortController.abort()
  }, [deckId]);

  const changeForm = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await updateCard(card);
    console.log(card);
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
              Edit Card
            </li>
          </ol>
        </nav>
      </div>
      <h1>Edit Card</h1>
      <div>
        <CardForm
          submitForm={submitForm}
          changeForm={changeForm}
          card={card}
          deck={deck}
        />
        {/* <div>
               <form onSubmit={submitForm}>
                 <div>
                   <label htmlFor="front">Front</label>
                   <textarea
                     name="front"
                     type="text"
                     value={card.front}
                     placeholder="Front side of card"
                     onChange={changeForm}
                   ></textarea>
                 </div>
                 <div>
                   <label htmlFor="back">Back</label>
                   <textarea
                     name="back"
                     type="text"
                     value={card.back}
                     placeholder="Back side of card"
                     onChange={changeForm}
                   ></textarea>
                 </div>
                 <Link to={`/decks/${deck.id}`}>
                   <button>Done</button>
                 </Link>
                   <button
                   type="submit">Save</button>
               </form>
               </div>    */}
      </div>
    </div>
  );
}
