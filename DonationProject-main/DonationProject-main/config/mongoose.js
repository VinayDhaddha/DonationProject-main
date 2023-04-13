const mongoose = require('mongoose');

try{
mongoose.connect('mongodb+srv://student:q35G6vJc-g7j$dR@cluster0.gp0blhd.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
}catch(err){
    console.log(err);
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;