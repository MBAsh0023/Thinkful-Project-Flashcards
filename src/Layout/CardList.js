import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export default function CardList({ cards = [] }) {
  const [currentCard, setCurrentCard] = useState(0);
  //set the card to on the front side
  const [frontSide, setFrontSide] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  const flipHandler = () => {
    setFrontSide(!frontSide);
  };

  const nextHandler = () => {
    //if last card display message to restart
    if (currentCard === cards.length - 1) {
      window.confirm(
        "Click OK to Restart or Cancel to return to the home page "
      )
        ? setCurrentCard(0)
        : history.push("/");
    } else {
      setCurrentCard(currentCard + 1);
      setFrontSide(!frontSide);
    }
  };

  return (
    <div>
      {cards.length > 2 ? (
        <div>
          <div className="card">
            <div className="card-body">
              <h4>
                Card {currentCard + 1} of {cards.length}
              </h4>
              <p>
                {frontSide ? cards[currentCard].front : cards[currentCard].back}
              </p>
              <button onClick={flipHandler} className="btn btn-secondary m1">Flip</button>
              {!frontSide && <button onClick={nextHandler} className="btn btn-primary">Next</button>}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Not Enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {cards.length} in this
            deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        </div>
      )}
    </div>
  );
}
