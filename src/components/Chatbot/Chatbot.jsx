import { useState } from "react";
import "./Chatbot.css";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useGlobalContext } from '../../contexts/context2'
import { MdSend } from "react-icons/md";
import Bot from "./bot1.png";
import Person from "./user.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Chatbot() {
  // State for the user's input message
  const [message, setMessage] = useState("");
  const {baseurl} = useGlobalContext()
  // Function to download the chat conversation as a PDF
  const downloadChat = () => {
    const input = document.getElementById("chatbot-messages");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  // Default chat messages when the component is loaded
  const [chats, setChats] = useState([
    { role: "bot", content: "Hi! I am Kbot. How can I assist you?" },
  ]);

  // Function to clear the chat history and reset to the default message
  const clearChat = () => {
    setChats([
      { role: "bot", content: "Hi! I am Kbot. How can I assist you?" },
    ]);
  };

  // State for indicating if the bot is currently typing
  const [isTyping, setIsTyping] = useState(false);

  // State for controlling the visibility of the chatbot UI
  const [isOpen, setIsOpen] = useState(false);
  

  // Function to handle user input and initiate a chat with the bot
  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;
    
    setChats(prevChats => [...prevChats, { role: "user", content: message }]);
    setMessage("");
    
    setChats(prevChats => [...prevChats, { role: "bot", content: "", class: "typing" }]);
    
    axios.post(`http://localhost:8000/chat`, { user_input: message }, {
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      })
      .then((response) => {
        // Check if the response is an object
        console.log(response)
        if (response.data && typeof response.data === 'object') {
          setChats(prevChats => {
            let newChats = [...prevChats];
            newChats[newChats.length - 1] = { role: "bot", content: response.data.Response }
            return newChats;
          });
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };
  
  

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button
        className="chatbot-icon"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) clearChat();
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
      {isOpen && (
        <main className="chatbot-main">
          <div className="chatbot-header">
            <h1 className="chatbot-title">Chat AI</h1>
            <button
              onClick={downloadChat}
              className="download-button"
              title="Download Chat"
            >
              <GetAppIcon />
            </button>
          </div>

          <section id="chatbot-messages" className="chatbot-messages">
            {/* Render chat messages */}
            {chats && chats.length
              ? chats.map((chat, index) => (
                  <div key={index} className={`chatbot-bubble ${chat.role}`}>
                    <div className={`chatbot-icon-container ${chat.role}`}>
                      {chat.role === "user" ? (
                        <img className="chatbot-imgs" src={Person} alt="User" />
                      ) : (
                        <img className="chatbot-imgs" src={Bot} alt="Bot" />
                      )}
                      <p className={`chatbot-content ${chat.class || ""}`}>
                        {chat.content}
                      </p>{" "}
                    </div>
                  </div>
                ))
              : ""}
          </section>

          <form
            className="chatbot-form"
            action=""
            onSubmit={(e) => chat(e, message)}
          >
            {/* Input field for typing messages */}
            <input
              type="text"
              name="message"
              value={message}
              placeholder="Type a message here ..."
              onChange={(e) => setMessage(e.target.value)}
              className="chatbot-input"
            />
            {/* Button to send the message */}
            <button type="submit" className="chatbot-submit" title="Send">
              <MdSend />
            </button>
            {/* Button to clear the chat */}
            <button
              type="button"
              onClick={clearChat}
              className="chatbot-clear"
              title="Clear Chat"
            >
              <ClearAllIcon />
            </button>
          </form>
        </main>
      )}
    </div>
  );
}

export default Chatbot;
