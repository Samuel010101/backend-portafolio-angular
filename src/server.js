const express = require('express')
const path = require('path'); // Este es un modulo de node que nos permite manejar las rutas de las vistas
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session')

// Initializations
const app = express();
require('./database');

// Settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // de esta forma le decimos a node cual es la ruta de nuestras vistas del front
app.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); // De esta forma ejecutamos el motor de las vistas configurado en el bloque anterior

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')); // Este Middleware nos permite utilizar en nuestro servidor otros metodos http mas que get y post
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// Global Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});