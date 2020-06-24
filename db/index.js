const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
    () => (console.log('Successfully connected to MongoDB.'))
)

module.exports = mongoose;