# Plagiarism Checker

This project is a web-based plagiarism checker that allows users to check text or uploaded documents for potential plagiarism. It uses OpenAI's GPT model to analyze the content and provide similarity scores.

## Features

- Text input for direct plagiarism checking
- File upload support for PDF and Word documents
- Plagiarism detection with overall similarity score
- Highlighted flagged sections with individual similarity scores
- Downloadable plagiarism report

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- An OpenAI API key

## Installation

1. Clone the repository: git clone https://github.com/yourusername/plagiarism-checker.git cd plagiarism-checker
2. Install the dependencies for both the backend and frontend
3. Create a `.env` file in the `backend` directory and add your OpenAI API key: OPENAI_API_KEY=your_api_key_here

## Running the Application

1. Start the backend server: cd backend nodemon app.js
The server will start running on `http://localhost:5000`.

2. In a new terminal, start the frontend development server: cd frontend npm start
The frontend will be accessible at `http://localhost:3000`.

3. Open your web browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. On the main page, you can either:
- Upload a PDF or Word document using the file upload area, or
- Enter text directly into the text input field

2. Click the "Check for Plagiarism" button to initiate the plagiarism check.

3. Wait for the results to be displayed. You'll see:
- An overall similarity score
- Flagged sections with individual similarity scores

4. You can download a full report of the plagiarism check results.

## Customization

To use your own OpenAI API for getting the output:

1. Ensure you have an active OpenAI API key.
2. Update the `.env` file in the `backend` directory with your API key.
3. If needed, you can modify the OpenAI model or parameters in the `backend/server.js` file:


```javascript
const response = await axios.post('https://api.openai.com/v1/chat/completions', {
  model: 'gpt-3.5-turbo', // You can change this to a different model if desired
  messages: [
    { role: 'system', content: 'You are a helpful assistant that checks for plagiarism.' },
    { role: 'user', content: `Check for similarities in the following text: "${text}"` }
  ],
  max_tokens: 500, // Adjust as needed
}, {
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
```
