'use client'

import { useState } from 'react';

const ChatgptAPI = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = userInput;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // API anahtarınızı buraya ekleyin
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });
  
    // API'den gelen yanıtı işleyin
    const data = await response.json();
  
    // Yanıttan üretilen metni alın
    const generatedText = data.choices[0].message.content;
  
    // Üretilen metni duruma ekleyin
    setGeneratedText(generatedText);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          rows={4}
          cols={50}
        />
        <button type="submit">Generate</button>
      </form>
      {generatedText && (
        <div>
          <h3>Generated Text:</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default ChatgptAPI;
