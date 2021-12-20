const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//connects the Expresss.js session to the Sequelize database
const sess = {
  //Replace with actual secret and store in .env
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//makes the public folder available to the client
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('./controllers/'));

// turn on connection to db and server
// force: true makes the database connection sync with the model definitions and associations; the tables re-create if there are association changes (similar to DROP TABLE IF EXISTS; this allows the table to be overwritten and re-created)
// if force: false and the table exists, any field additions/modifications/deletions you have won't be executed
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});