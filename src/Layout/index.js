import React, { useEffect, useState } from "react";
import { Switch, Route, useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study"
import DeckView from "./DeckView"
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";


function Layout() {

  // const [deck,setDeck] = useState([])
  //   const { deckId } = useParams();

  //   useEffect(() => {
  //       const { signal } = new AbortController()
  //       async function loadDeck(){
  //           try{
  //               const cardsFromAPI = await readDeck(deckId, signal);
  //               console.log(cardsFromAPI);
  //               setDeck(cardsFromAPI)
  //           } catch(e) {
  //               console.log(e)
  //           }
  //       }
  //       loadDeck();
  //      // return AbortController.abort()
  //   },[deckId])
  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
