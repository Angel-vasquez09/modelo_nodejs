const express     = require("express");
const cors        = require("cors");
const path        = require("path");
const exphbs      = require("express-handlebars");
const handleblars = require("handlebars");
const { bdConection } = require("../config/bd");
//const { socketController } = require('../socket/socket');

class Server {
    
    //? NOTA: Si vas a utilizar socket habilita lo que esta comentado o borralo si no lo necesitas

    constructor(){
        this.app  = express();
        this.port = process.env.PORT; 

        //* Si vas a utilizar socket agrega las sigueintes lineas
        /* this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); */

        //this.conectadBD();

        this.handlerbars();

        this.middleware();

        this.routes()

        //* Activa la linea para trabajar con socket
        //this.sockets();
    }

    middleware(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    async conectadBD(){
        await bdConection();
    }

    handlerbars(){
        this.app.set('views', path.join(__dirname,'../', '/views'));
        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir : path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
            handlebars: handleblars
        }))
        this.app.set('view engine', '.hbs');
    }

    //* Si vas a utilizar sockect intalalo y utiliza el siguiente metodo
    /* sockets(){
        // npm i socket.io
        this.io.on('connection', (socket) => socketController(socket, this.io));
    } */


    routes(){ 
        this.app.use('/',require('../routes/views'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto ${this.port}!`)
        })
    }
    // Si vas a trabajar con socket utiliza este y borra la anterior
    /* listen(){
        this.server.listen(this.port, () => {
            console.log(`Corriendo en el puerto ${this.port}!`)
        })
    } */
}

module.exports = Server;