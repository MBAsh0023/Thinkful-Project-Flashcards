import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory} from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
 const [card, setCard] = useState({ front: "", back: "", deckId:''});
 const history = useHistory()

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
    return () => abortController.abort()
  }, [deckId]);



  const changeForm = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const submitForm = async (e) => {
    const {signal} = new AbortController();
    e.preventDefault();
    await createCard(deckId, card, signal);
    setCard({ front: "", back: ""});
  };

  const onDone = () => {
    history.push(`/decks/${deck.id}`)
  }

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
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <h1>{`${deck.name}: Add Card`}</h1>
      <CardForm
      submitForm={submitForm}
      changeForm={changeForm}
      card={card}
      deck={deck}
      onDone={onDone}/>
      {/* <form onSubmit={submitForm}>
        <div>
          <label htmlFor="front">Front</label>
          <textarea
            name="front"
            type="text"
            placeholder="Front side of card"
            onChange={changeForm}
            value={card.front}
          ></textarea>
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <textarea
            name="back"
            type="text"
            placeholder="Back side of card"
            onChange={changeForm}
            value={card.back}
          ></textarea>
        </div>
        <Link to={`/decks/${deck.id}`}>
          <button>Done</button>
        </Link>
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
}
