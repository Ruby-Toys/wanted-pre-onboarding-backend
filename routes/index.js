const authRouter = require('./routes/auth');
const resumesRouter = require('./routes/resumes');
const jobPostingsRouter = require('./routes/jobPostings');
const applicationsRouter = require('./routes/applications');
const exception = require('./routes/exception');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/resumes', resumesRouter);
    app.use('/jobPostings', jobPostingsRouter);
    app.use('/applications', applicationsRouter);
    exception(app);
};