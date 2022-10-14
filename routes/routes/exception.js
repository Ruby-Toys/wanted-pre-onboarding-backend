const exceptionHandler = (app) => {
    app.use((err, req, res, next) => {
        if (err.status && err.message) {
            console.log(`${err.status} / ${err.message}`);
            return res.status(err.status).json({message : err.message});
        }

        if (err.message) {
            console.log(err.message);
            return res.status(400).json(err.message);
        }

        return res.status(400).json('요청이 잘못되었습니다.');
    })
}

module.exports = exceptionHandler;