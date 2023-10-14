import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch user details' });
    }
});

app.listen(8000, () => {
    console.log('App is running @ port 8000')
})