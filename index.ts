import express from 'express';
import users from '@/api/routes/users';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

app.use('/users', users);

export default app;
