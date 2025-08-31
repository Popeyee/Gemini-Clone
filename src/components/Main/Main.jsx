import React, { useContext, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSend,
    userInput,
    setUserInput,
    showResult,
    resultData,
    displayedText,
    isTyping,
    recentPrompt,
    loading,
  } = useContext(Context);

  const handleClickKeyDown = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      onSend(userInput);
    }
  };

  const handleCardClick = (event) => {
    const cardText = event.currentTarget.querySelector("p").innerText;
    setUserInput(cardText);
    onSend(cardText);
  };

  // Render the typing effect from displayedText
  const renderTypingText = () => {
    return displayedText.map((wordObj, index) => {
      // Handle newlines specifically
      if (wordObj.isNewline || wordObj.text.includes("\n")) {
        const parts = wordObj.text.split("\n");
        return parts.map((part, partIndex) => (
          <React.Fragment key={`${index}-${partIndex}`}>
            {wordObj.isBold ? <b>{part}</b> : <span>{part}</span>}
            {partIndex < parts.length - 1 && <br />}
          </React.Fragment>
        ));
      }

      if (wordObj.isBold) {
        return <b key={index}>{wordObj.text}</b>;
      }
      return <span key={index}>{wordObj.text}</span>;
    });
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      {/* // MAIN CONTAINER */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev!</span>
              </p>
              <p>How can I assist you today?</p>
            </div>

            <div className="cards">
              <div className="card" onClick={handleCardClick}>
                <p>what is react</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={handleCardClick}>
                <p>what is CSS</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={handleCardClick}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={handleCardClick}>
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="result">
              <div className="result-header">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>

              {/* GEMINI RESPONSE BELOW
              -------------------------------- */}
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div className="typing-container">
                    <p>
                      {renderTypingText()}
                      {isTyping && <span className="typing-cursor">|</span>}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* ------- BOTTOM CONTAINER ------- */}
      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            type="text"
            placeholder="Ask for anything..."
            onKeyDown={handleClickKeyDown}
          />
          <div className="icons">
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img onClick={handleClickKeyDown} src={assets.send_icon} alt="" />
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
