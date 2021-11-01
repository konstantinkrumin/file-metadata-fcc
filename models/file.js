const mongoose = require('mongoose');

const { Schema } = mongoose;

const fileSchema = new Schema({
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

module.exports = mongoose.model('File', fileSchema);
