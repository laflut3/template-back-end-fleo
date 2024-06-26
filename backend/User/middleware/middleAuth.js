// User/middleware/middleAuth.js
module.exports = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.status(401).send('You need to login to access this resource');
};
