'use client'

import { useState } from 'react';
import axios from 'axios';

const ChatgptAPI = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-002/completions', // API URL'nizi buraya ekleyin
        {
          prompt: userInput,
          max_tokens: 50,
          n: 1,
          stop: '\n',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // API Anahtarınızı buraya ekleyin
          },
        }
      );
      const generated = response.data.choices[0].text.trim();
      setGeneratedText(generated);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Hata mesajını kullanıcıya göstermek için burada bir durum (state) kullanabilirsiniz
    }
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
