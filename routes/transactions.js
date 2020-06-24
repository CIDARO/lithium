const express = require('express');
const { Transaction } = require('../models');
const router = express.Router();

// Retrieve the transactions
router.get(process.env.API_BASE + '/transactions', async (req, res) => {
    try {
        // Retrieve the query string info
        const { dateFrom, dateTo } = req.query;
        // Build the query object
        const query = {};
        if (dateFrom !== -1 && dateTo !== -1) {
            query['price'] = {"$gte": dateFrom, "$lte": dateTo};
        } else if (dateFrom !== -1) {
            query['price'] = {"$gte": dateFrom};
        } else if (dateTo !== -1) {
            query['price'] = {"$lte": dateTo};
        }
        // Retrieve the transactions
        const transactions = await Transaction.find(query);
        res.status(200).send({transactions});
    } catch (error) {
        console.error(`[GET] ${process.env.API_BASE}/transactions`, error);
        res.status(500).send();
    }
})

module.exports = router;