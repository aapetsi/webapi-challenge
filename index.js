require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const projects = require('./routes/api/projects');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors middleware
app.use(cors());

// express middleware
app.use(express.json());

// subroutes middleware
app.use('/api/projects', projects);

app.use(express.static(__dirname + '/client/build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
