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
        const newUser = await knex('users')
            .insert({ 
                userName: userName,
                password: password 
            })
            .returning('id');
        const userId = newUser[0].id;

        res.status(201).json({ message: 'Account created successfully', userId });
    } catch (error) {
        console.log('Error in account creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await knex('users').where({ userName }).first();
        if (!user) {
            return res.status(404).json({ message: 'Username not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login', error });
    }
});

app.get('/userInventory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userInventory = await knex('inventory').select('*').where({ userID: id});
        if(!userInventory) {
            return res.status(404).json({ message: 'Account inventory not found' });
        }
        res.json(userInventory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting account inventory', error });
    }
})


app.get('/Visitor', async (req, res) => {
    try {
        const fullInventory = await knex('inventory').select('*');
        res.json(fullInventory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching inventory data', error });
    }
})

app.post('/addItem/:userID', async (req, res) => {
    const { userID } = req.params;
    const { itemName, description, quantity } = req.body;
    
    if(!itemName || !description || !quantity) {
        return res.status(400).json({ message: 'All boxes must be filled' });
    } 
    const existingItem = await knex('inventory').where('itemName', itemName).first();
    if(existingItem) {
        return res.status(400).json({ message: 'You have already added this item' });
    }

    try {
        const newItem = await knex('inventory').insert({ itemName: itemName,
            description: description,
            quantity: quantity,
            userID: userID })
            .returning('id');
        const itemID = newItem[0].id;

        res.status(201).json({ message: 'Item added', itemID });
    } catch (error) {
        console.log('Error adding item:', error);
        res.status(500).json({ message: 'Error adding item to database. Please try again.' });
    }
})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});