const express = require('express');
const morgan = require('morgan');
const {sequelize} = require('./models');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const session = require("express-session");

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 8080);

sequelize.sync({force : false})
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

app.listen(app.get('port'), () => {
    console.log('서버 실행!')
})