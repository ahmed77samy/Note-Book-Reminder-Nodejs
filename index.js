const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'views')));
app.use(router);

const PORT = 3000;
app.listen(PORT, () => console.log(`server is start on port ${PORT}`));
