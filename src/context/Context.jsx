import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [userInput, setUserInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [resultData, setResultData] = useState([]);
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const onSend = async (prompt) => {
    // Use the prompt parameter if provided, otherwise use userInput
    const inputToSend = prompt || userInput;

    setRecentPrompt(inputToSend);
    setUserInput("");
    setShowResult(true);
    setResultData([]);
    setDisplayedText([]);
    setIsTyping(false);
    setLoading(true);

    // Add to previous prompts if it's not already there
    if (inputToSend && !previousPrompts.includes(inputToSend)) {
      setPreviousPrompts((prev) => [...prev, inputToSend]);
    }

    try {
      const response = await main(inputToSend);
      setLoading(false);

      // Process response for bold formatting (your original logic)
      const responseArray = response.split("**");
      let cleaned = responseArray.map((item) => item.replace(/^\*\s*/gm, "\n"));
      setResultData(cleaned);

      // Start typing effect after resultData is set
      startTypingEffect(cleaned);
    } catch (error) {
      setLoading(false);
      console.error("Error in onSend:", error);

      // Set error message to display
      const errorMessage = error.message.includes("API key")
        ? "Invalid API key. Please check your Gemini API configuration."
        : error.message.includes("Failed to fetch")
        ? "Network error. Please check your internet connection and try again."
        : "An error occurred. Please try again.";

      setResultData([errorMessage]);
      setDisplayedText([{ text: errorMessage, isBold: false }]);
    }
  };

  const startTypingEffect = (processedData) => {
    setIsTyping(true);
    setDisplayedText([]);

    // Convert processed data to words while preserving formatting info
    const wordsToType = [];

    processedData.forEach((part, index) => {
      const isBold = index % 2 === 1;
      // Split on whitespace but keep whitespace, newlines, and text
      const words = part.split(/(\s+|\n+)/);

      words.forEach((word) => {
        if (word.length > 0) {
          // Include all characters including spaces and newlines
          wordsToType.push({
            text: word,
            isBold: isBold,
            isNewline: word.includes("\n"),
          });
        }
      });
    });

    // Type words one by one
    wordsToType.forEach((wordObj, index) => {
      setTimeout(() => {
        setDisplayedText((prev) => [...prev, wordObj]);

        // Set typing to false when all words are displayed
        if (index === wordsToType.length - 1) {
          setIsTyping(false);
        }
      }, 10 * index);
    });
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    userInput,
    setUserInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    displayedText,
    isTyping,
    onSend,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
