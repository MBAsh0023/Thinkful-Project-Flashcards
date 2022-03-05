import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";

export default function CardForm() {
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
    await updateCard(card);

    history.push(`/decks/${deck.id}`);
  };

  return (
    <div key={card.id}>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <div>
            <label htmlFor="front">Front</label>
            <textarea
              name="front"
              type="text"
              value={card.front}
              placeholder="Front side of card"
              onChange={changeForm}
              className="form-control"
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
              className="form-control"
            ></textarea>
          </div>
        </div>
        <Link to={`/decks/${deck.id}`}>
          <button className="btn btn-secondary m-1">Done</button>
        </Link>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
