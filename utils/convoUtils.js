const fs = require("fs");

const openConvoRecords = () => JSON.parse(
  fs.readFileSync('./cache/convo_records.json', {encoding: "utf8"})
);

const saveConvoRecords = (convoRecords) => fs.writeFileSync(
  './cache/convo_records.json',
  JSON.stringify(convoRecords, null, 4),
  {encoding: "utf8"}
);

module.exports = {
  openConvoRecords,
  saveConvoRecords
};