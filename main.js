import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAO1tD3DWfU_vnmy3j-dBEtXqNUA36gGPY";

const genAI = new GoogleGenerativeAI(API_KEY);

// Use a valid model name from the list you got
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

const chat = model.startChat({ generationConfig: { maxOutputTokens: 1000 } });

const messageHolder = document.getElementById("messageHolder");
const input = document.getElementById("chat");
const button = document.getElementById("btn");

function addMessage(text, sender = "user") {
  const div = document.createElement("div");
  div.className = sender; // "user" or "bot"
  div.textContent = text;
  messageHolder.appendChild(div);
  messageHolder.scrollTop = messageHolder.scrollHeight;
}

button.addEventListener("click", async () => {
  console.log("Send button clicked");

  const message = input.value.trim();
  console.log("User message:", message);

  if (!message) {
    console.log("Empty message, ignoring send.");
    return;
  }

  addMessage(message, "user");
  input.value = "";
  input.disabled = true;
  button.disabled = true;

  try {
    const response = await chat.sendMessage(message);
    console.log("API response received:", response);

    const reply = await response.response.text();
    console.log("Bot reply:", reply);

    addMessage(reply, "bot");
  } catch (error) {
    console.error("Error sending message:", error);
    addMessage("Error: " + error.message, "bot");
  }

  input.disabled = false;
  button.disabled = false;
  input.focus();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});
