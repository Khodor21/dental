import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8002/messages");
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8002/messages", {
        sender,
        recipient,
        content,
      });
      setSender("");
      setRecipient("");
      setContent("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat App</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message._id} className="mb-2">
              <strong>{message.sender}: </strong>
              {message.content}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">New Message</h2>
        <form onSubmit={sendMessage}>
          <div className="mb-2">
            <label className="block">
              Sender:
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="border border-gray-300 p-1 w-full"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block">
              Recipient:
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="border border-gray-300 p-1 w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              Content:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-300 p-1 w-full"
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
