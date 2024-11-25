const jwt = require("jsonwebtoken");
const secret = "@fayyaz$7877@";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if (!token) {
        console.error("Token is missing!");
        return null;
    }
    try {
        console.log("Received Token:", token);
        const decoded = jwt.verify(token, secret);

        console.log("Decoded Token:", decoded);

        return decoded;
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return null;
    }
}



module.exports = {
    setUser,
    getUser,
}