const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, `uploads/${Date.now()}-${file.originalname}`);
  },
});

const uploadFile = multer({
  storage: storageConfig,
});

app.use(cors());
app.use(uploadFile.single('upfile'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ urlencoded: false }));

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const File = mongoose.model('File', fileSchema);

const createAndSaveFile = (filename, path) => {
  const file = new File({
    name: filename,
    path: path,
  });

  return file
    .save()
    .then(() => {
      return { successMsg: 'File was successfully saved' };
    })
    .catch((err) => {
      return { error: err };
    });
};

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  const file = req.file;

  createAndSaveFile(file.originalname, file.path)
    .then(() => {
      return res.json({ name: file.originalname, type: file.mimetype, size: file.size });
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
