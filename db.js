const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.yti85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro em conectar ao MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
