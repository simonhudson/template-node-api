import express from 'express';
import departments from '@/endpoints/departments/routes';
import users from '@/endpoints/users/routes';

const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

app.use('/departments', departments);
app.use('/users', users);

module.exports = app;
