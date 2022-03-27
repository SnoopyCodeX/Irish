const fs = require("fs");

const getAllCommands = (excludedFiles = []) => {
  let files = {};
  let names = [];
  
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file.match(/\.js$/) !== null && !excludedFiles.includes(file)) {
      const name = file.replace('.js', '');
      files[name] = require('./' + file);
      names.push(files[name].name);
    }
  });
  
  files['names'] = names;
  return files;
}

module.exports = getAllCommands([
  'all.js'
]);