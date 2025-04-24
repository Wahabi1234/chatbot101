import requests

API_KEY = "AIzaSyAO1tD3DWfU_vnmy3j-dBEtXqNUA36gGPY"
MODEL_NAME = "models/gemini-2.0-flash"  # Use the model name you confirmed earlier

def generate_response(prompt):
    url = f"https://generativelanguage.googleapis.com/v1/{MODEL_NAME}:generateContent?key={API_KEY}"

    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        response_json = response.json()
        # Extract the generated text from the response
        try:
            text = response_json["candidates"][0]["content"]
            return text
        except (KeyError, IndexError):
            return "Error: Unexpected response format."
    else:
        return f"Error: {response.status_code} - {response.text}"

if __name__ == "__main__":
    print("Welcome to Gemini Python Chatbot!")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break

        bot_response = generate_response(user_input)
        print("Bot:", bot_response)
