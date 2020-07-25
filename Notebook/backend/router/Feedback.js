const router = require("express").Router();
const Feedback = require("../models/Feedback.model");

router.route("/").get((req, res) =>{
    Feedback.find().then(comments => res.json(comments)).catch(err => res.status(400).json("Error"+ err));
});
router.route("/add").post((req, res)=>{
    console.log(req);
    const UserEmail = req.body.userEmail;
    const UserDescription = req.body.userDescription;
    const NewUser = new Feedback({UserEmail, UserDescription});
    NewUser.save().then(()=>res.json("Comment added!")).catch((err)=>res.status(400).json("error"+err));
});
router.route("/delete/:id").delete((req, res) =>{
    console.log(req.params.id);
    Feedback.findByIdAndDelete(req.params.id).then(() => res.json("Feedback deleted!")).catch((err) => res.status(400).json("error" + err));
});
module.exports= router;