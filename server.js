const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Setup handlebar
app.engine('handlebars', exphbs({
    extname: '.handlebars',
    defaultLayout: null
}));
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'handlebars');
console.log(path.join(__dirname,'./views'))

// Routes
app.use('/', require('./routes/index.js'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Error handling for if URL not found
app.use((req, res, next) => {
  res.status(404).send({message: 'URL not found!'});
});

const PORT = process.env.PORT || 50000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));