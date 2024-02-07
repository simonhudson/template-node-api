import express from 'express';
// import players from '@/api/players';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

// app.use('/players', players);

export default app;
