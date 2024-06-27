module.exports = function (req, res, next) {
    if (!req.session.userId) {
        return res.status(401).send('Not authenticated');
    }
    next();
};

module.exports.isAdmin = async function (req, res, next) {
    if (!req.session.userId) {
        return res.status(401).send('Not authenticated');
    }

    const user = await User.findById(req.session.userId);
    if (!user || !user.isAdmin) {
        return res.status(403).send('Unauthorized');
    }

    next();
};
