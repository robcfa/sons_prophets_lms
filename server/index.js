const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { db } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// initialize DB
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS meetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    type TEXT,
    date TEXT,
    time TEXT,
    notes TEXT,
    recordingUrl TEXT
  )`);
});

app.get('/meetings', (req, res) => {
  db.all('SELECT * FROM meetings', (err, rows) => {
    if (err) return res.status(500).json({ error: 'db_error' });
    res.json(rows);
  });
});

app.post('/meetings', (req, res) => {
  const { title, type, date, time, notes } = req.body;
  db.run(
    'INSERT INTO meetings (title, type, date, time, notes) VALUES (?,?,?,?,?)',
    [title, type, date, time, notes],
    function (err) {
      if (err) return res.status(500).json({ error: 'db_error' });
      res.json({ id: this.lastID });
    }
  );
});

app.get('/meetings/:id', (req, res) => {
  db.get('SELECT * FROM meetings WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db_error' });
    if (!row) return res.status(404).json({ error: 'not_found' });
    res.json(row);
  });
});

app.post('/meetings/:id/recording', upload.single('recording'), (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;
  db.run(
    'UPDATE meetings SET recordingUrl = ? WHERE id = ?',
    [fileUrl, req.params.id],
    err => {
      if (err) return res.status(500).json({ error: 'db_error' });
      res.json({ url: fileUrl });
    }
  );
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
