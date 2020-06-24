const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        transactionHash: {
            type: String,
            required: true,
            trim: true,
        },
        transactionIndex: {
            type: Number,
            required: true,
        },
        blockHash: {
            type: String,
            required: true,
            trim: true,
        },
        contractAddress: {
            type: String,
            required: true,
            trim: true,
        },
        cumulativeGasUsed: {
            type: Number,
            required: true,
        },
        gasUsed: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
        },
        transactionDate: {
            type: Number,
        }
    },
    { autoCreate: true }
);

transactionSchema.pre('save', async (next) => {
    const transaction = this;
    transaction.transactionDate = Date.now();
    next();
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;