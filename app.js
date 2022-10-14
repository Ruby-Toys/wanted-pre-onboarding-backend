const express = require('express');
const morgan = require('morgan');
const {sequelize} = require('./models');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const session = require("express-session");
const passport = require('passport');
const passportConfig = require('./passport');
const routers = require('./routes');

dotenv.config();
passportConfig();

const app = express();

app.set('port', process.env.PORT || 8080);

sequelize.sync({force : true})
    .then(() => {
        console.log('데이터베이스 연결 성공!')
    })
    .catch(err => {
        console.log(err)
    });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));
app.use(passport.initialize({}));
app.use(passport.session({}));

routers(app);

module.exports = app;