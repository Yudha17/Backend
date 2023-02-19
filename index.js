const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "danstest2",
});

app.get("/login", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM user WHERE email = ? AND password = ?', 
        [username, password],
        (err, result) => {
        if(err) {
            res.send({err: err})
        } 
        if(result.length > 0){

            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
              
        } else {

            res.send({message: 'Invalid Email or Password !'})
        }
        
    });
});

/*app.get("/insert", (req, res) => {
    db.query('INSERT INTO user (user_id,email, password) VALUES ("teta002", "bajing@gmail.com", "Qwerhu54321!")', (err, result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
});*/

app.listen(3001, () => {
    console.log("server running");
});