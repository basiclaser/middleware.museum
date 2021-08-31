export default function(req, res, next) {
    // in reality you'd check your database here
    // but for this example, we'll just use a fake user

    // User.findById(req.session.userId).exec(function (error, user) {
    const error = false;
    const foundUser = {'user':'bob'}

    if (error) {
        var err = new Error('There was an internal server error');
        err.status = 500;
        return next(err);
    } else {      
        if (foundUser === null) {     
            var err = new Error('Not authorized! Go back!');
            err.status = 401;
            return next(err);
        } else {
            return next();
        }
    }
    // });

}