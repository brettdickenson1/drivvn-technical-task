import React, { useState, useEffect } from "react";
import "./CardDisplay.css";
import snapSound from "../assets/soundfx.mp3";

const CardDisplay = ({ currentCard, previousCard }) => {
  const [audio] = useState(new Audio(snapSound));

  useEffect(() => {
    const playAudio = () => {
      audio.currentTime = 0; // Reset audio to start
      audio.play();
    };

    // Check for a match and play audio
    if (currentCard && previousCard) {
      if (
        (currentCard.suit === previousCard.suit && currentCard.suit) ||
        (currentCard.value === previousCard.value && currentCard.value)
      ) {
        playAudio();
      }
    }
  }, [currentCard, previousCard, audio]);

  return (
    <div className="card-display">
      <div className="placeholder-card">
        {previousCard && (
          <img
            src={previousCard.image}
            alt="Previous Card"
            className="card-image"
          />
        )}
      </div>
      <div className="placeholder-card">
        {currentCard && (
          <img
            src={currentCard.image}
            alt="Current Card"
            className="card-image"
          />
        )}
      </div>
    </div>
  );
};

export default CardDisplay;
