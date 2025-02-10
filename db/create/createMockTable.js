const createMockTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS mock(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      mock_text TEXT
    )
  `;

  const insertSQL = `
    INSERT INTO mock(mock_text)
     VALUES
      ("This is mock text 1),
      ("This is mock text 2);
  `;

  return { createTableSQL, insertSQL };
};

module.exports = createMockTable;
