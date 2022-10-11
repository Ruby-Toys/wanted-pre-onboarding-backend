const jobSeekersRouter = require('./routes/jobSeekers');
const authRouter = require('./routes/auth');
const exception = require('./routes/exception');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/jobSeekers', jobSeekersRouter);
    exception(app);
};