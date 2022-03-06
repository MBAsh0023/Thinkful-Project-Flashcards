import React from "react";

export default function CardForm({
  card,
  submitForm,
  changeForm,
  deck,
  onDone,
}) {
  return (
    <div>
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
          {/* <Link to={`/decks/${deck.id}`}> */}
          <button onClick={onDone} className="btn btn-secondary m-1">Done</button>
          {/* </Link> */}
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
