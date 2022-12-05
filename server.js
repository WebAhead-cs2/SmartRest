const express = require('express');

const app = express();
const { Pool } = require('./database/dbConfig');

const PORT = 4000;
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(`${__dirname}/public`));
app.use('/menu', express.static(`${__dirname}/public/menu`));
app.use('/sign-up', express.static(`${__dirname}/public/sign-up`));
app.use(express.static(`${__dirname}/public/sign-in`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/sign-in/sign-in.html`);
});

app.get('/menu', (req, res) => {
  res.sendFile(`${__dirname}/public/menu/menu.html`);
});

app.get('/sign-up', (req, res) => {
  res.sendFile(`${__dirname}/public/sign-up/sign-up.html`);
});

app.post('/public/sign-up/sign-up.html', (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
