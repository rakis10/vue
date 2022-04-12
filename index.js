var express = require('express');
app = express();
var path = require('path');
var mongoUri = "mongodb+srv://user:user@cluster0.cl947.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var serveStatic = require('serve-static');
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require('mongoose')
const users = require("./routes/api/users")
const passport = require('passport')

const bodyParser = require('body-parser')
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
var hostname = '127.0.0.1';

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))


app.use('/api/users',users)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})
app.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}/`);
});