// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ token, onLogout }) {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('http://localhost:5000/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCards(data.cards);
      } else {
        alert('Not logged in');
      }
    };
    fetchCards();
  }, [token]);

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      {cards.map((card) => (
        <div key={card.id} onClick={() => navigate(`/map/${card.id}`)}>
          {card.title}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;