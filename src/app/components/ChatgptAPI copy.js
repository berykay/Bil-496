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

/*
'use client'

import { useState, useEffect } from 'react';
import styles from './ChatgptAPI.module.css';

const ChatgptAPI = () => {
  const [assistant, setAssistant] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  useEffect(() => {
    fetch('https://api.openai.com/v1/assistants/asst_41lBzAAC4q413iYJf2WKg8UP', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, 
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Assistant could not be retrieved.');
        }
      })
      .then(data => {
        setAssistant(data);
        console.log('Assistant retrieved successfully.'); 
      })
      .catch(error => {
        console.error('Error retrieving assistant:', error); 
      });
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    setMessages([...messages, { role: 'user', content: userInput }]);
    const response = await fetch(`https://api.openai.com/v1/threads/${assistant.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        role: 'user',
        content: userInput
      })
    });
    const data = await response.json();
    const assistantResponse = data.content;

    setMessages([...messages, { role: 'assistant', content: assistantResponse }]);

    setGeneratedText(assistantResponse);

    setUserInput('');
  };

  return (
    <div className={styles.center}>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          rows={4}
          cols={50}
        />
        <button onClick={sendMessage} type="button">Send</button>
      </div>
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

*/