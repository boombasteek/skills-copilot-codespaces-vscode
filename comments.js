// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Import routes
const comments = require('./routes/comments');

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/comments', comments);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}!`));
```

## Routes

```js
// Path: routes/comments.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all comments
router.get('/', (req, res) => {
  res.json(db);
});

// Get comment by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = db.find(comment => comment.id === id);

  if (comment) {
    res.json(comment);
  } else {
    res.sendStatus(404);
  }
});

// Create comment
router.post('/', (req, res) => {
  const comment = req.body;
  comment.id = db.length + 1;
  db.push(comment);
  res.json(comment);
});

// Update comment
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let comment = db.find(comment => comment.id === id);

  if (comment) {
    comment = req.body;
    comment.id = id;
    db[id - 1] = comment;
    res.json(comment);
  } else {
    res.sendStatus(404);
  }
});

// Delete comment
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let comment = db.find(comment => comment.id === id);

  if (comment) {
    db.splice(id - 1, 1);
    res.json(comment);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
```

## Database

```js
// Path: database.js
module.exports = [
  {
    id: 1,
    name: 'John Doe',
    email: '