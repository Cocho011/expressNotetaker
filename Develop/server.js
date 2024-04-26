const express = require('express');
const { stat } = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const theHomies = [
  {
    id: 1,
    name: 'Delmy',
    email: 'milene@gmail.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Julian',
    email: 'julian@gmail.com',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Sadie the Baby',
    email: 'Sadie@gmail.com',
    status: 'active',
  },
  {
    id: 4,
    name: 'Adam the Hubster',
    email: 'adam@gmail.com',
    status: 'active',
  },
];

app.get('/notes', (req, res) => {
  res.json(theHomies);
});

app.post('/api/homies', (req, res) => {
  res.send('Homie added');
});

app.delete('/api/homies/:id', (req, res) => {
  res.send('Homie deleted');
});

// sets static folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
