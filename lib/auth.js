const jwt = require('jsonwebtoken');
const config = require('../config')

function auth(req, res, next) {
    const exempted_url = config.whitelisted.split(',');

    req.url = req.url.split('?')[0];
    for(let url of exempted_url){
        if (req.url === url) {
            return next();
        }
    }

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied! No token provided');

    try {
        const decoded = jwt.verify(token, config.jwtKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;