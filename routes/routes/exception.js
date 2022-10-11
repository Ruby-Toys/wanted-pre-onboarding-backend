const exceptionHandler = (app) => {
    app.use((err, req, res, next) => {
        console.log(`${err.status} / ${err.message}`);
        res.status(err.status).send(err.message);
    })
}

module.exports = exceptionHandler;