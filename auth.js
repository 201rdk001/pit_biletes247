/**
 * User authentication check middleware
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next 
 */
module.exports = (req, res, next) => {
    const user = req.session.user;

    if (!user) {
        next(403);
        return;
    }

    if (user.name && user.surname) {
        res.locals.name = `${user.name} ${user.surname}`;
    }
    else {
        res.locals.name = user.username;
    }
    
    res.locals.is_admin = user.is_admin;
    next();
}
