var express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var path = require('path');
var bodyParser = require('body-parser')
var UserRoutes = require('./routes/userRoutes.js');
var adminRoutes = require('./routes/adminRoutes.js');
var connectToDatabase = require('./config/db');

var app = express();

const port = 3004
const uri = 'mongodb+srv://1zhanarysasan:iQ8HCPFSRKXW1tbi@cluster0.zzgomxz.mongodb.net/?retryWrites=true&w=majority';
const store = new MongoDBStore({
    uri: uri,
    collection: 'sessions'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: '489th24niomgw-rkf0d[p,128wefionj2409fin2pmv',
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', UserRoutes);
app.use('/admin/', adminRoutes);


connectToDatabase(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
