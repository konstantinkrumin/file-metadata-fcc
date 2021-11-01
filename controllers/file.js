const File = require('../models/file');

exports.createAndSaveFile = (filename, path) => {
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
