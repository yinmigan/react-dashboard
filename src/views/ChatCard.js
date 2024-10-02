import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap"; // Ensure you have imported Card
import axios from "axios";

const ChatCard = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the chat with a greeting message
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch("https://flood-detection-application-a0czgwa9cqa7g3a9.eastasia-01.azurewebsites.net/azureopenai");
        console.log(response)
        const greetingMessage = await response.text(); // or response.json() if the response is JSON
        console.log(greetingMessage)
        setMessages([{ role: "assistant", content: greetingMessage }]);
      } catch (error) {
        console.error("Error fetching greeting message", error);
      }
    };

    fetchGreeting(); // Call the async function to fetch the greeting message
  }, []); // Empty dependency array to run only once on mount

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("https://flood-detection-application-a0czgwa9cqa7g3a9.eastasia-01.azurewebsites.net/azureopenai-query", { prompt: input });
      console.log("Response", response);
      const botResponse = response.data;
      setMessages([...newMessages, { role: "assistant", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching response from OpenAI", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ height: "400px", display: "flex", flexDirection: "column" }}>
      <Card.Body style={{ flex: "1", overflowY: "auto", padding: "10px" }}>
        {/* Chat history displayed above the input */}
        <div className="chat-window">
          <div className="chat-history" style={{ maxHeight: "100%", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`} style={{
                textAlign: msg.role === "user" ? "right" : "left",
                margin: "5px 0",
              }}>
                <span style={{ 
                  display: "inline-block", 
                  padding: "8px", 
                  borderRadius: "5px", 
                  backgroundColor: msg.role === "user" ? "#d1e7dd" : "#f8d7da",
                  maxWidth: "80%",
                  wordWrap: "break-word"
                }}>
                  <strong>{msg.role === "user" ? "You" : "Detector Bot"}: </strong>{msg.content}
                </span>
              </div>
            ))}
            {isLoading && <div className="chat-message assistant">Detector Bot: Loading...</div>}
          </div>
        </div>
      </Card.Body>

      {/* Input field and send button */}
      <div className="chat-input" style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          style={{ width: "calc(100% - 100px)", marginRight: "10px", borderRadius: "5px", padding: "8px" }}
        />
        <button onClick={handleSendMessage} style={{ padding: "8px 16px", borderRadius: "5px" }}>
          Send
        </button>
      </div>
    </Card>
  );
};

export default ChatCard;
