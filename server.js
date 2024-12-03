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

app.post('/createAccount', async (req, res) => {
    const { userName, password } = req.body;

    if(!userName || !password) {
        return res.status(400).json({ message: 'There must be a username and password' })
    }

    const existingUser = await knex('users').where('userName', userName).first();

    if(existingUser) {
        return res.status(400).json({ message: 'Username is taken' });
    }

    try {
        const newUser = await knex('users').insert({ userName, password }).returning('id');
        const userId = newUser[0].id;

        await knex('users').insert({
            id: userId,
            userName: userName,
            password: password
        });

        res.status(201).json({ message: 'Account created successfully', userId });
    } catch (error) {
        console.log('Error in account creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});








app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});