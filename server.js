const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ urlencoded: false }));

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
