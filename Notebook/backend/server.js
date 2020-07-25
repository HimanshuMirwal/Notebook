const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");
const bodyParser = require('body-parser');

// Files to perform crud operations.
const ExerciseRouter = require("./router/exercise");
const UserRouter = require("./router/user");
const Feedback = require("./router/Feedback");

// const AdminRouter = require("./router/AdminPanel");

const App = express();
App.use('/admin', formidableMiddleware());
App.use(/^\/(?!admin).*/, express.urlencoded({ extended: false }));

// App.use(bodyParser.urlencoded({ extended: true }));
// App.use(bodyParser.json());
// App.use(bodyParser.raw());

// to get our global env var.
require("dotenv").config();

/* this line tells Express to use the public folder as our static folder from which we can serve static files*/
App.use(express.static('public'));

//enable to acces other server
App.use(cors());

// to pass and receive json.
App.use(express.json());

// Our Routes.
App.use("/exercise",ExerciseRouter);
App.use("/user", UserRouter);
App.use("/Feedback",Feedback);

// App.use("/admin", AdminRouter);

// To connect to mongoDB.
mongoose.connect("mongodb://localhost:27017/Notebook",{useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true});

// To check wether the connection is established or not.
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("connection established successfully.");
});

App.post('/password', (req, res) => {
    console.log('Got body:', req.body);
    const receivedPassword = req.body.password;
    const receivedEmail = req.body.Email;
    console.log(process.env.ADMIN+" "+process.env.PASSWORD);
    if(receivedPassword === process.env.PASSWORD && receivedEmail === process.env.ADMIN){
        const dataToSendBack = JSON.stringify({status:"200 Ok !",authentication:true});
        res.send(JSON.parse(dataToSendBack));
    }else{
        const dataToSendBack = JSON.stringify({status:"500 something wentwrong!",authentication:false});
        res.send(JSON.parse(dataToSendBack));
    }
});

App.listen(5000 || process.env.PORT, ()=>{
    console.log("server started on port 5000");
});