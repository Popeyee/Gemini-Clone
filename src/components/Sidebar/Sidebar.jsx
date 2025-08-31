import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js"; //
import { Context } from "../../context/context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const handleExtended = () => {
    setExtended((prev) => !prev);
  };
  const {
    previousPrompts,
    onSend,
    setRecentPrompt,
    setUserInput,
    setShowResult,
    setResultData,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSend(prompt);
    setRecentPrompt(prompt);
  };

  const handleNewChat = () => {
    setUserInput("");
    setRecentPrompt("");
    setShowResult(false);
    setResultData([]);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={handleExtended}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div className="new-chat" onClick={() => handleNewChat()}>
          <img className="plus" src={assets.plus_icon} alt="" />
          {extended ? <span>New chat</span> : null}
        </div>

        {extended ? (
          <div className="recent">
            <span className="recent-title">Recent</span>

            <ul>
              {previousPrompts.map((item, index) => (
                <li
                  key={index}
                  className="recent-entry"
                  onClick={(e) =>
                    item ? loadPrompt(item) : loadPrompt(e.target.innerText)
                  }
                >
                  <img
                    className="message_icon"
                    src={assets.message_icon}
                    alt=""
                  />
                  <p>{item ? item.slice(0, 18) + "...." : ""}</p>
                </li>
              ))}
            </ul>

            {/* <img className="message_icon" src={assets.message_icon} alt="" /> */}
            {/* <span>what is react...</span> */}
          </div>
        ) : null}
      </div>
      {/* BOTTOM SECTION */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img className="" src={assets.question_icon} alt="" />
          {extended ? <span>Help</span> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img className="" src={assets.history_icon} alt="" />
          {extended ? <span>Activity</span> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img className="" src={assets.setting_icon} alt="" />
          {extended ? <span>Settings</span> : null}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
