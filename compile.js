const path = require("path");
const fs = require("fs");
const solc = require("solc");

const mafiaPath = path.resolve(__dirname, "contracts", "Mafia.sol");
const source = fs.readFileSync(mafiaPath, "utf8");

 module.exports = solc.compile(source, 1).contracts[':Mafia']
