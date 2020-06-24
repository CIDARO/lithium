/**
 * Lithium - CIDARO Ethereum Transaction cost analyzer
 * Proudly developed by Paolo Rollo
 * ©2020 CIDARO Srl
 */
// Require the database module
require('../db');
// Basic imports (ExpressJS + CORS + path)
const express = require('express');
const cors = require('cors');
const path = require('path');
// Setup CORS options
const corsOptions = {
    origin: process.env.ORIGIN,
    optionSuccessStatus: 200,
};

// Initialize the app
const app = express();

// Disable etag and x-powered-by for performance purposes
app.disable('etag').disable('x-powered-by');
// CORS middleware
app.use(cors(corsOptions));
// JSON and URLEncoded middlewares
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb', extended: true}));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Import routes
const { transactionRoutes } = require('./routes');
app.use('/', transactionRoutes);

// Heartbeat route
app.get('/ping', async (req, res) => {
    res.status(200).send('pong');
})

// Default '*' route to serve the react app routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

// Start listening on the port
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
})