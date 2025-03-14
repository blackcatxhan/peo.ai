# PEO.AI - Prompt Engineering Optimizer

A web application that helps optimize and enhance prompts for AI models using Google's Gemini API. PEO.AI provides real-time feedback and suggestions to improve your prompts for better AI interactions.

https://github.com/user-attachments/assets/a06dc31f-a796-47bd-88ac-29c5775bc86c

## Features

- 🎨 Modern, responsive dark mode UI built with React and Material-UI
- 🧠 Intelligent prompt optimization powered by Google's Gemini API
- ⚡ Real-time streaming responses with SSE (Server-Sent Events)
- 💬 Conversation history with markdown and code block support
- 📋 Easy code copying with hover-to-reveal copy buttons
- 🔄 Follow-up prompts for iterative optimization

## Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Google Gemini API key

### Backend Setup

1. Create a `.env` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open your browser and navigate to the URL shown in the Vite output (typically http://localhost:5173)
2. Enter your prompt in the input field
3. Receive optimized prompt suggestions with detailed explanations
4. Continue the conversation with follow-up prompts
5. Use the copy button to easily copy code blocks
6. Clear the conversation at any time with the delete button

## Technologies Used

### Frontend
- React 18
- Material-UI (MUI)
- React Markdown
- Syntax Highlighting with react-syntax-highlighter
- Vite for fast development and building

### Backend
- Flask
- Flask-CORS
- Google Gemini API (gemini-2.0-flash model)
- Server-Sent Events (SSE) for streaming responses

## Project Structure

```
peo.ai/
├── .env                  # Environment variables (create this file)
├── app.py                # Flask server and API endpoints
├── main.py               # Conversation class and Gemini API integration
├── requirements.txt      # Python dependencies
└── frontend/             # React frontend
    ├── index.html        # HTML entry point
    ├── package.json      # Frontend dependencies
    └── src/              # React source code
        ├── App.jsx       # Main application component
        ├── main.jsx      # React entry point
        └── theme.js      # MUI theme configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
