var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(express.static('public'));

const mongoose = require('mongoose');
const { usuario, conexionBD } = require('./baseDatos');

var userSockets = {};




app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'tu cadena secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(cookieParser('your secret here'));



var auth = function (req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        return res.sendStatus(401);
    }
}


//Funciones get
app.get('/', (req, res) => {
    var contenido = fs.readFileSync("public/index.html");
    res.setHeader("Content-type", "text/html");
    res.send(contenido);
});

app.get('/login', (req, response) => {
    var contenido = fs.readFileSync("public/login.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/rutaSegura', auth, (req, response) => { //con auth solo puedes entrar autenticado si no de saltara Unauthorized
    var contenido = fs.readFileSync("public/index-log.html");//cuenta de logueado
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
app.get('/logout', (req, response) => {
    var contenido = fs.readFileSync("public/login.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/registroNueva', (req, response) => {
    var contenido = fs.readFileSync("public/registro.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/nosotros', (req, response) => {
    var contenido = fs.readFileSync("public/nosotros.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/contacto', (req, response) => {
    var contenido = fs.readFileSync("public/contacto.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/tienda', (req, response) => {
    var contenido = fs.readFileSync("public/tienda.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/blog', (req, response) => {
    var contenido = fs.readFileSync("public/blog.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/cuenta', (req, response) => {
    var contenido = fs.readFileSync("public/cuenta.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});



//Funciones post
app.post('/identificar', async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.send({ "res": "login failed" });
    }

    try {
        // Buscar el usuario en la base de datos
        let usuarioEncontrado = await usuario.findOne({ nombre: req.body.username, password: req.body.password });
       
        if (usuarioEncontrado) {
            // Usuario encontrado, establecer la sesión
            req.session.usuario = req.body.username;
            req.session.admin = true; // Configura esto según tus necesidades
          
            return res.send({ "res": "login true" });
        } else {
            // Usuario no encontrado
            return res.send({ "res": "not valid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "res": "error" });
    }
});
app.post('/registroNueva', async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.send({ "res": "register failed" });
    }

    try {
        let usuarioExiste = await usuario.findOne({ nombre: req.body.username });
        if (usuarioExiste) {
             res.send({ "res": "usuario ya existe" });
        } else {
            // Si el usuario no existe, crear uno nuevo
            const nuevoUsuario = new usuario({
                nombre: req.body.username,
                password: req.body.password // En una aplicación real, debes hashear la contraseña
            });
            // Guardar el nuevo usuario en la base de datos
            await nuevoUsuario.save();
            // Enviar una respuesta de éxito
            res.send({ "res": "register true" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "res": "error" });
    }
});



conexionBD();



server.listen(81, function() {
    console.log('Servidor corriendo en http://localhost:81');
});



