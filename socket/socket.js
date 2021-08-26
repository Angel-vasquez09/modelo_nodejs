//* SI NO VAS A UTILIZAR SOCKET ELIMINA ESTE ARCHIVO
const { Socket } = require("socket.io");
const { comprobarToken } = require("../helpers/generar-token");

const socketController = async(socket = new Socket, io) => {

    const datos = await comprobarToken(socket.handshake.headers['x-token']);
    
    if (!datos) {
        return socket.disconnect();
    }

    socket.join( datos.id ); //? Crear una sala para este usuario

    socket.on('disconnect', async() => {
        socket.broadcast.emit('desconectado', user);
    });

    
}

module.exports = {
    socketController
}