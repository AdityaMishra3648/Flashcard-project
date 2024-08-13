// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [flashcards, setFlashcards] = useState([]);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [newAnswer, setNewAnswer] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/flashcards')
//       .then(res => res.json())
//       .then(data => setFlashcards(data));
//   }, []);

//   const handleFlip = () => {
//     setFlipped(!flipped);
//   };

//   const handleNext = () => {
//     setFlipped(false);
//     setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
//   };

//   const handlePrevious = () => {
//     setFlipped(false);
//     setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
//   };

//   const handleAddFlashcard = () => {
//     fetch('http://localhost:5000/api/flashcards', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
//     })
//       .then(response => response.text())
//       .then(message => {
//         alert(message);
//         setNewQuestion('');
//         setNewAnswer('');
//         fetch('http://localhost:5000/api/flashcards')
//           .then(res => res.json())
//           .then(data => setFlashcards(data));
//       });
//   };

//   if (!flashcards.length) {
//     return <div>Loading...</div>;
//   }

//   const currentCard = flashcards[currentCardIndex];

//   return (
//     <div className="App">
//       <div className={`card ${flipped ? 'flipped' : ''}`}>
//         <div className="front">
//           <strong>Question:</strong> {currentCard.question}
//         </div>
//         <div className="back">
//           <strong>Answer:</strong> {currentCard.answer}
//         </div>
//       </div>
//       <button className="flip-button" onClick={handleFlip}>Flip</button>
//       <div className="button-group">
//         <button className="prev-button" onClick={handlePrevious}>Previous</button>
//         <button className="next-button" onClick={handleNext}>Next</button>
//         <button className="delete-button">Delete</button>
//         <button className="edit-button">Edit</button>
//       </div>
//       <div className="add-flashcard">
//         <h2>Add New Flashcard</h2>
//         <input
//           type="text"
//           placeholder="Question"
//           value={newQuestion}
//           onChange={(e) => setNewQuestion(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Answer"
//           value={newAnswer}
//           onChange={(e) => setNewAnswer(e.target.value)}
//         />
//         <button className="add-button" onClick={handleAddFlashcard}>Add Flashcard</button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/flashcards')
      .then(res => res.json())
      .then(data => setFlashcards(data));
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleDelete = (id) => {
    if(flashcards.length<=1)return;
    fetch(`http://localhost:5000/api/flashcards/${id}`, { method: 'DELETE' })
      .then(() => {
        setFlashcards(flashcards.filter(card => card.id !== id));
        setCurrentCardIndex(0);
      });
  };

  const handleEdit = (id) => {
    const updatedQuestion = prompt("Enter new question:", flashcards[currentCardIndex].question);
    const updatedAnswer = prompt("Enter new answer:", flashcards[currentCardIndex].answer);

    if (updatedQuestion && updatedAnswer) {
      fetch(`http://localhost:5000/api/flashcards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: updatedQuestion, answer: updatedAnswer })
      })
      .then(() => {
        setFlashcards(flashcards.map(card => 
          card.id === id ? { ...card, question: updatedQuestion, answer: updatedAnswer } : card
        ));
      });
    }
  };

  const handleAddFlashcard = () => {
    fetch('http://localhost:5000/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFlashcard)
    })
    .then(() => {
      setFlashcards([...flashcards, newFlashcard]);
      setNewFlashcard({ question: '', answer: '' });
    });
  };

  if (!flashcards.length) {
    return <div>Loading...</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="App">
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        <div className="front">
          <h1>Question:</h1> {currentCard.question}
        </div>
        <div className="back">
          <h1>Answer:</h1> {currentCard.answer}
        </div>
      </div>
      <button className="flip-button" onClick={handleFlip}>Flip</button>
      <div className="button-group">
        <button className="prev-button" onClick={handlePrevious}>Previous</button>
        <button className="next-button" onClick={handleNext}>Next</button>
        <button className="delete-button" onClick={() => handleDelete(currentCard.id)}>Delete</button>
        <button className="edit-button" onClick={() => handleEdit(currentCard.id)}>Edit</button>
      </div>
      {/* <div> */}
       <div className="add-flashcard">
        <h3>Add New Flashcard</h3>
        <input 
          type="text" 
          placeholder="Question" 
          value={newFlashcard.question} 
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Answer" 
          value={newFlashcard.answer} 
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        />
        <button className="add-button" onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>
    </div>
  );
}

export default App;


