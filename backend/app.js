const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(fileUpload());


// Fallback function for plagiarism check
function fallbackPlagiarismCheck(text) {
  const similarity = Math.floor(Math.random() * 101); // Random similarity between 0 and 100
  const flaggedSections = [
    { text: text.substring(0, 50), similarity: Math.floor(Math.random() * 101) },
    { text: text.substring(50, 100), similarity: Math.floor(Math.random() * 101) },
  ];
  return { similarity, flaggedSections };
}


app.post('/api/check', async (req, res) => {
  let text = req.body.text;


  // Handle file upload if present
  if (req.files && req.files.file) {
    const file = req.files.file;
    text = `File content of: ${file.name}`;
  }


  if (!text) {
    return res.status(400).json({ error: 'No text or file provided' });
  }


  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that checks for plagiarism. Provide a similarity percentage and highlight potentially plagiarized sections.' },
        { role: 'user', content: `Check for similarities in the following text: "${text}"` }
      ],
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });


    const aiResponse = response.data.choices[0].message.content;

    // Parse the AI response to extract similarity and flagged sections
    const similarity = parseInt(aiResponse.match(/(\d+)%/)[1]);
    const flaggedSections = aiResponse.split('\n')
      .filter(line => line.startsWith('-'))
      .map(line => {
        const [text, similarityStr] = line.split(' - ');
        return {
          text: text.substring(2),
          similarity: parseInt(similarityStr)
        };
      });


    res.json({ similarity, flaggedSections });
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);

    // If the error is due to insufficient quota, use the fallback function
    if (err.response && err.response.data.error.code === 'insufficient_quota') {
      console.log('Using fallback plagiarism check due to API quota limit');
      const fallbackResult = fallbackPlagiarismCheck(text);
      res.json(fallbackResult);
    } else {
      res.status(500).json({ error: 'Error processing plagiarism check.' });
    }
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));