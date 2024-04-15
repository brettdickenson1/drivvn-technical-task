import React, { useState, useEffect } from "react";
import CardDisplay from "./components/CardDisplay";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [previousCard, setPreviousCard] = useState(null);
  const [valueMatches, setValueMatches] = useState(0);
  const [valueMatchesText, setValueMatchesText] = useState("");
  const [suitMatches, setSuitMatches] = useState(0);
  const [suitMatchesText, setSuitMatchesText] = useState("");
  const [remainingCards, setRemainingCards] = useState(52);
  const [message, setMessage] = useState("");

  // Fetches a new deck of cards from the API on component mount
  useEffect(() => {
    fetchNewDeck();
  }, []);

  // Function to fetch a new deck of cards
  const fetchNewDeck = async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();
    setDeckId(data.deck_id);
  };

  // Function to draw a card from the deck
  const drawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    const drawnCard = data.cards[0]; // Get the drawn card from the response data

    // Update the previous card if there's a current card
    if (currentCard) {
      setPreviousCard(currentCard);
    }

    // Update the current card and remaining cards count
    setCurrentCard(drawnCard);
    setRemainingCards(data.remaining);

    // Set current card to null if there are no remaining cards
    if (data.remaining === 0) {
      setCurrentCard(null);
    }
  };

  // useEffect to check for card matching (suit or value)
  useEffect(() => {
    if (currentCard?.suit === previousCard?.suit && currentCard) {
      setMessage("SNAP SUIT!");
      setSuitMatches((prevValue) => prevValue + 1);
    } else if (currentCard?.value === previousCard?.value && currentCard) {
      setMessage("SNAP VALUE!");
      setValueMatches((prevValue) => prevValue + 1);
    } else {
      setMessage("");
    }
  }, [currentCard, previousCard?.suit, previousCard?.value]);

  // useEffect to update match statistics when remaining cards reach 0
  useEffect(() => {
    if (remainingCards === 0) {
      setValueMatchesText(`VALUE MATCHES: ${valueMatches}`);
      setSuitMatchesText(`SUIT MATCHES: ${suitMatches}`);
    }
  }, [remainingCards, valueMatches, suitMatches]);

  // Rendering the main layout with game components
  return (
    <div className="App">
      <h1 className="title">SNAP</h1>
      <div className="message-container">
        <p className="message">{message}</p>
      </div>
      <div className="container">
        <CardDisplay currentCard={currentCard} previousCard={previousCard} />
        {remainingCards > 0 ? (
          <>
            <Button onClick={drawCard} disabled={remainingCards === 0} />
            <p className="remaining-cards">Remaining cards: {remainingCards}</p>
          </>
        ) : null}
        <p className="message">{valueMatchesText}</p>
        <p className="message">{suitMatchesText}</p>
      </div>
    </div>
  );
}

export default App;
