const populateTables = require("./populate/populateTables");
const createMockTable = require("./create/createMockTable");

//tables as an array must return { createTableSQL, insertSQL },
//where insertSQL is optional
populateTables([createMockTable]);
