const { Client } = require('pg');

const getConnection = async () => {
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    password: '123456',
    port: 5432,
    database: 'eccomerce'
  });

  await client.connect();
  return client;
};

module.exports = {
  getConnection
};
