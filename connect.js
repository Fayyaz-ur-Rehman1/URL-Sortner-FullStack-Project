const mongoose = require("mongoose");

async function mongoDBConnected(url) {
    return mongoose.connect(url);
}

module.exports = {
    mongoDBConnected,
}