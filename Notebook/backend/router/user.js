const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) =>{
    User.find().then(users => res.json(users)).catch(err => res.status(400).json("Error"+ err));
});
router.route("/add").post((req, res)=>{
    const username = req.body.username;
    console.log(username);
    const NewUser = new User({username});
    NewUser.save().then(()=>res.json("Stream added!")).catch((err)=>res.status(400).json("error"+err));
});
router.route("/:id").get((req, res) =>{
    console.log(req.params.id);
    User.findById(req.params.id).then(user => res.json(user)).catch(err => res.status(400).json("Error"+ err));
});
router.route("/delete/:id").delete((req, res) =>{
    console.log(req.params.id);
    User.findByIdAndDelete(req.params.id).then(() => res.json("Stream deleted!")).catch((err) => res.status(400).json("error" + err));
});
module.exports= router;