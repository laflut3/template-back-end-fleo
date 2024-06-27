const User = require('../model/User');

const middleAuth = function (req, res, next) {
    if (!req.session.userId) {
        return res.status(401).send('Not authenticated');
    }
    next();
};

middleAuth.estAdmin = async function (req, res, next) {
    if (!req.session.userId) {
        return res.status(401).send('Not authenticated');
    }

    const user = await User.findById(req.session.userId);
    if (!user || !user.estAdmin) {
        return res.status(403).send('Unauthorized');
    }

    next();
};

module.exports = middleAuth;
