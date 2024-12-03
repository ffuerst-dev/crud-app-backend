const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5173', 
    methods: 'GET,POST,PUT,DELETE',  
    credentials: true,
}));

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const users = await knex('users').select('*');
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users data', error });
    }
} )









app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});