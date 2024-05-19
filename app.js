const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
//our database
const config = require('./config/database');

mongoose.Promise = global.Promise;
const app = express();
app.use(session({ secret: 'melody hensley is my spirit animal' }));
const port = 9000;
//connect to db
// mongoose.connect(config.database);

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

//cors middleware
app.use(cors());
//bodyparser middleware
app.use(bodyParser.json());
//lets initialise passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

var users = require('./routes/users');
var members = require('./routes/members');
var questionarie = require('./routes/template');
var package = require('./routes/package');
var userPacakge = require('./routes/user-package');
var membersaveanswer = require('./routes/membersaveanswer');
var feedback = require('./routes/feedback');
var sections = require('./routes/sections');
app.use('/users',users);
app.use('/members',members);
app.use('/template',questionarie);
app.use('/package',package);
app.use('/users',userPacakge);
app.use('/memberssave',membersaveanswer);
app.use('/feedback',feedback);
app.use('/section',sections);


// app.use(express.static(path.join(__dirname,'public')));
//default route
app.get('/',(req,res)=>{
   res.send('hello world');
});


app.listen(port,()=>{
    console.log('server running on '+port);
})