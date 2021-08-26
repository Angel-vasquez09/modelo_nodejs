const mongoose = require("mongoose");

const bdConection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log("Base de datos online!");

    } catch (error) {
        console.error(error);
        throw new Error("Error al conectar la base de datos");
    }
}

module.exports = {
    bdConection
}