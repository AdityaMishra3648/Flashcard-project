// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'ad6307104139', // replace with your MySQL root password
//     database: 'flashcardDB'
// });

// db.connect(err => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL Connected...');
// });

// // Get all flashcards
// app.get('/api/flashcards', (req, res) => {
//     const query = 'SELECT * FROM flashcards';
//     db.query(query, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// // Add a new flashcard
// app.post('/api/flashcards', (req, res) => {
//     const { question, answer } = req.body;
//     const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
//     db.query(query, [question, answer], (err, result) => {
//         if (err) throw err;
//         res.send('Flashcard added successfully');
//     });
// });

// // Update a flashcard
// app.put('/api/flashcards/:id', (req, res) => {
//     const { id } = req.params;
//     const { question, answer } = req.body;
//     const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
//     db.query(query, [question, answer, id], (err, result) => {
//         if (err) throw err;
//         res.send('Flashcard updated successfully');
//     });
// });

// // Delete a flashcard
// app.delete('/api/flashcards/:id', (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM flashcards WHERE id = ?';
//     db.query(query, [id], (err, result) => {
//         if (err) throw err;
//         res.send('Flashcard deleted successfully');
//     });
// });

// // Ensure a sample flashcard exists
// const ensureSampleFlashcardExists = () => {
//     const sampleQuestion = 'Sample Question';
//     const sampleAnswer = 'This is a sample answer.';
//     const query = 'INSERT IGNORE INTO flashcards (question, answer) VALUES (?, ?)';
//     db.query(query, [sampleQuestion, sampleAnswer], (err, result) => {
//         if (err) throw err;
//     });
// };

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//     ensureSampleFlashcardExists();
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ad6307104139', // replace with your MySQL root password
    database: 'flashcardDB'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
    const query = 'SELECT * FROM flashcards';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new flashcard
app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(query, [question, answer], (err, result) => {
        if (err) throw err;
        res.send('Flashcard added successfully');
    });
});

// Update a flashcard
app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
    db.query(query, [question, answer, id], (err, result) => {
        if (err) throw err;
        res.send('Flashcard updated successfully');
    });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM flashcards WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Flashcard deleted successfully');
    });
});

// Ensure a sample flashcard exists
const ensureSampleFlashcardExists = () => {
    const sampleQuestion = 'Sample Question';
    const sampleAnswer = 'This is a sample answer.';
    const query = 'INSERT IGNORE INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(query, [sampleQuestion, sampleAnswer], (err, result) => {
        if (err) throw err;
    });
};

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    ensureSampleFlashcardExists();
    console.log(`Server running on port ${PORT}`);
});

