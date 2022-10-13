const jobSeekersRouter = require('./routes/jobSeekers');
const authRouter = require('./routes/auth');
const resumesRouter = require('./routes/resumes');
const jobPostingsRouter = require('./routes/jobPostings');
const exception = require('./routes/exception');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/jobSeekers', jobSeekersRouter);
    app.use('/resumes', resumesRouter);
    app.use('/jobPostings', jobPostingsRouter);
    exception(app);
};