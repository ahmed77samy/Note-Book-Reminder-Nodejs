const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
const router = require('./router');
const env = require('./config/env-config');

const app = express();
const BP = bodyparser.urlencoded({ extended: true });
const STORE = new MongoDBStore({
  uri: env.DBURL,
  collection: 'sessions',
  expires: 24*60*60*100
});
const COOKIE = {
  maxAge: 24*60*60*100
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  session({
    secret: env.SECRETKEYSESSIONS,
    resave: false,
    saveUninitialized: false,
    store: STORE,
    cookie: COOKIE
  })
);

app.use(express.static(path.join(__dirname, 'views')));
app.use(BP);
app.use(flash());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => console.log(`server is start on port ${PORT}`));
