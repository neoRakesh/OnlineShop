const express = require('express');
const bodyParser = require('body-parser');

const path=require('path');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views','views');
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// app.use(express.static(path.join(__dirname,'public')));


// app.use(bodyParser.urlencoded({extended: false}));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'));
// });

const errorController = require('./controllers/error');
const db=require('./util/database');



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);


