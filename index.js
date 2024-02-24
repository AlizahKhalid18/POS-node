const express = require("express");
const app = express();
app.use(express.json());

let users = [];

function sum ( req, res, next) {
    res.send({status: "ok", calculation : parseInt( req.query.a ) + parseInt( req.query.b ) })
}
function sub ( req, res, next) {
    res.send({status: "ok", calculation : parseInt( req.query.a ) - parseInt( req.query.b ) })
}

function multiply ( req, res, next) {
    res.send({status: "ok", calculation : parseInt( req.query.a ) * parseInt( req.query.b ) })
}

function divide ( req, res, next) {
    res.send({status: "ok", calculation : parseInt( req.query.a ) / parseInt( req.query.b ) })
}

function storeUser (req, res, next) {
    let { body } = req;
    users.push(body);
    res.send({status : "OK", users});
}

function getUser (req, res, next) {
    res.send({status : "OK", users});
}



function updatebyid (req, res, next){
    const {body} = req;
    const uniqueid = req.query.id
    function finduser (user,){
        if (user.id === parseInt(uniqueid)){
            return user;
        }
    }
    

    let user = users.filter(finduser)[0];
    let index = users.findIndex(x => x.id === user.id);
    users[index] = {...user, userName : body.userName}
    res.send({status : "OK", users});

}

app.post("/storeuser", storeUser);
app.put("/updatebyid", updatebyid);
app.get("/getusers", getUser)

app.get("/sum", sum)
app.use("/sub", sub)
app.use("/multi", multiply)
app.use("/div", divide)

function listen () {
    console.log("Application is running")
}

app.listen(4000,listen);