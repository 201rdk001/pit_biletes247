module.exports = () => {
    /**
     * User authentication check middleware
     * @param {import('express').Request} req 
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next 
     */
    return (req, res, next) => {
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
        
        next();
    }
}
