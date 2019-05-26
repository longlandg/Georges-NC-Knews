const app = require('./app');

const { PORT = 9096 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
