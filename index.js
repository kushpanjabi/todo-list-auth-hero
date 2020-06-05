const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined


// middleware

app.use(express.json()); // allows req.body
app.use(cors());

// app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === 'production') {
    //server static content
    //npm runbuild
    app.use(express.static(path.join(__dirname, 'client/build')));
}

console.log(__dirname);
console.log(path.join(__dirname, 'client/build'));

// ROUTES 

// register and login routes

app.use('/auth', require('./routes/jwtAuth'));

// dashboard routes
app.use('/dashboard', require('./routes/dashboard'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});