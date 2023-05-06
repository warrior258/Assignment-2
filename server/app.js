const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5500;

app.use(cors());


const connectDB = require('./config/db.js');
require('dotenv').config();

app.use(express.json());

// ROUTE Files
const User = require('./routes/User.js');
const formData = require('./routes/formData.js');

// ROUTES
app.use('/api/v1/user', User);
app.use('/api/v1/form', formData);


app.get('/', (req, res) => {
    res.send("<body style='margin: 0; padding: 0; font-family: sans-serif;'><div style='height: 100vh; background-color: black; color: white; display: flex; justify-content: center; align-items: center;'><h1>Admin Panel</h1><div></body>");
});


const start = async () => {
    try {    
        await connectDB(process.env.MONGO_URL);
        console.log("Connected to DB!")
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();