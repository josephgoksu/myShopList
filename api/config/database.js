const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shoplist');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', ()=>{
    console.log("Database successfully connected!")
});

module.exports = db;