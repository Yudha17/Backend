const express = require("express"); 
//const fetch = require("node-fetch");
const db = require("./database/setup.js");
const users = require( "./database/userTable.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
/*console.log(process.env)*/



const app = express();
/*app.use(cookieParser());*/

const cors = require('cors');
const { or } = require("sequelize");

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));



try {
    db.authenticate();
    console.log('Database Connected');
    // it used just one for create the table
    /*users.sync();*/
} catch (error) {
    
    console.log('Please check your XAMPP Server conneciton !')
}

app.use(express.json())
app.use(cookieParser())


app.post("/listjob", async (req, res) =>{

    let authHeader = req.body.headers.Authorization
    let token = authHeader.slice(7, 219)

    //console.log(token)

    if (!token) {return res.sendStatus(405)}

    try {
        // Use REFRESH_TOKEN_SECRET because json appear is refreshToken
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if(err){
                res.sendStatus(402)
                  
            } else {

                //using URL
                /*const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`
                
                const options = {
                    "method": "GET",
                }

                const response = await fetch(url, options)
                    .then(res => res.json())
                    .catch(e => {
                        console.error({
                            "message": "ERROR", error: e,
                        })
                    })
 
                //console.log(response.length)
                //res.json(response)
                //console.log(response)*/

                const url = `http://localhost:3002/list`
                
                const options = {
                    "method": "GET",
                }

                const response = await fetch(url, options)
                    .then(res => res.json())
                    .catch(e => {
                        console.error({
                            "message": "ERROR", error: e,
                        })
                    })
 
                //console.log(response.length)
                res.json(response)
                //console.log(response)

                
                
            }
        })
        
    } catch (error) {
        console.log(error)
        
    }
    
})

app.get("/user", async (req, res) => {
    

        let authHeader = req.headers['authorization']
        let token = authHeader && authHeader.split(' ')[1]
        

        if (!token) {return res.sendStatus(401)}

        try {
            // Use REFRESH_TOKEN_SECRET because json appear is refreshToken
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if(err){
                    res.sendStatus(401)
                      
                } else {
                    const user = await users.findAll()
                    res.json(user);
                }
            })
            
        } catch (error) {
            console.log(error)
            
        }
})

app.get("/accesstoken", async (req, res) => {

    
    const accessCookieToken = req.cookies['access-token']

    if(accessCookieToken == null){return res.json({message: " There is no cookies "})}

    let user
    try {
        user = await users.findOne({ where: { access_token: accessCookieToken }})

    } catch (error) {
        console.log(error)
    }

    
    try {
        jwt.verify(accessCookieToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            {
                const userDatabaseId = user.id
                const userDatabaseEmail = user.email
                const userFullName = user.full_name
                let refreshToken = jwt.sign({id: userDatabaseId, email: userDatabaseEmail, full_name: userFullName }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "3000" })
                res.json({refreshToken});
            }
        })
    } catch (error) {
        console.log(error)
    }
    
})

app.post("/register", async (req, res) => {

        
            const saltRounds = 10;
            const bodyName = req.body.full_name
            const bodyEmail = req.body.email
            const bodyPassword = req.body.password
            const bodyConfPassword = req.body.confirm_password
            
            let usCr
            let usFi = users.findOne({where:{
            email: bodyEmail
            }})
                if((await usFi) != null){
                    res.status(200).json({message: 'Registration Unsuccesfull, Email already exist !',usFi})
                } else {

                    const hash1 = bcrypt.hashSync(bodyPassword,saltRounds)
                    const hash2 = bcrypt.hashSync(bodyConfPassword,saltRounds)

                    usCr = users.create({  
                        full_name: bodyName,
                        email: bodyEmail,
                        password: hash1,
                        confirm_password: hash2
                    })
                    
                    res.status(201).json({message: 'Registration Successfully !'})
                }
   
})

app.post("/login", async (req, res) => {

    const bodyEmail = req.body.email
    const bodyPassword = req.body.password
    
    const searchUser = await users.findOne({ where: { email: bodyEmail }})
    
    

    if(searchUser === null){
        return res.json({message: " User Does Not Exist"})
    } else {
        bcrypt.compare(bodyPassword, searchUser.password, async (err, result) => {
        // result == true
            if(!result){
                return res.json({message: " Wrong Password "})
            } else {
                const authorized = true
                // create tokens by json web token
                

                 let accessToken = jwt.sign({email: bodyEmail, id: searchUser.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "20000" })
                
                
              
                // create tokens by json web token
              
                 let refreshToken = jwt.sign({email: bodyEmail, id: searchUser.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20000"})
                
               
            
                
                try {
                    await users.update({access_token: accessToken} , {
                        where: {
                            email: bodyEmail
                        }
                    })

    
                    res.cookie("access-token", accessToken, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })

                    res.json({refreshToken}) 
                } catch (error) {
                    console.log(error)
                }
                    
            }
                
        })
    }
})

app.delete("/logout", async (req, res) => {

    
    const accessCookieToken = req.cookies['access-token']

    let user
    try {
        user = await users.findOne({ where: { access_token: accessCookieToken }})

    } catch (error) {
        res.sendStatus(403)
    }

    const userDatabaseId = user.id
    try {
        await users.update({access_token: null} , {
            where: {
                id: userDatabaseId
            }
        })
    } catch (error) {
        res.sendStatus(403)
    }

    res.clearCookie("access-token")
    res.sendStatus(200)
})


    

app.listen(3001, () => {
    console.log("server running");
})

