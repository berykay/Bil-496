'use client'

import { useState,useEffect  } from 'react'
import axios from 'axios';

const ChatgptAPI = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  useEffect(() => {
    // Bu useEffect içinde, DOM manipülasyonu yaparak "className" uyumsuzluğunu engellemeye çalışabilirsiniz.
    // Örnek olarak, bir süre bekleyerek useEffect'in işini tamamlamasını ve DOM'un güncellenmesini sağlayabilirsiniz.
    const timer = setTimeout(() => {
      // Örnek bir DOM manipülasyonu:
      const elements = document.querySelectorAll('.__className_e66fe9');
      elements.forEach((element) => {
        element.classList.remove('vsc-initialized');
      });
    }, 100);
    return () => clearTimeout(timer); // useEffect temizliği
  }, []);


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: userInput,
          max_tokens: 50,
          n: 1,
          stop: '\n',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
      const generated = response.data.choices[0].text.trim();
      setGeneratedText(generated);
    } catch (error) {
      console.error('Error fetching data:', error);
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
