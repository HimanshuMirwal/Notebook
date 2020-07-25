const router = require("express").Router();
let Exercise = require("../models/exercise.model");
const multer = require("multer");
const path = require("path");

// multer storage.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + (file.originalname).substr(0, 15) + path.extname(file.originalname));
    }
});

// Create an upload instance and receive a single file.
var upload = multer({ storage: storage }).array('file');

router.get("/image/:id", (req, res) => {
    // let folder = fs.readdirSync("public/uploads");
    // console.log(req.params.id);
    const pic = (req.params.id).substr(1);
    // console.log(pic);
    // console.log(folder);
    res.sendFile(process.cwd() + "/public/uploads/" + pic);
});
router.get("/pdf/:id", (req, res) => {
    // let folder = fs.readdirSync("public/uploads");
    // console.log(req.params.id);
    const pdf = (req.params.id).substr(1);
    // console.log(pdf);
    // console.log(folder);
    res.sendFile(process.cwd() + "/public/uploads/" + pdf);
});
router.route("/").get((req, res) => {
    Exercise.find().then(users => res.json({ users: users })).catch(err => res.status(400).json("Error" + err));
});
router.route("/add").post((req, res) => {
    upload(req, res, function (err) {
        console.log(req);
        const username = req.body.username;
        const description = req.body.description;
        const date = Date.parse(req.body.date);
        if (req.files[0] && req.files[1]) {
            if (req.files[0].mimetype === "image/png" && req.files[1].mimetype === "application/pdf") {
                console.log("every thing is OK");
                const path = req.files[0].path;
                const FileName = req.files[0].filename;
                const pathPdf = req.files[1].path;
                const FileNamePDF = req.files[1].filename;
                const username = req.body.username;
                const description = req.body.description;
                const date = Date.parse(req.body.date);
                const NewExercise = new Exercise({ username, description, date, path, FileName, pathPdf, FileNamePDF });
                NewExercise.save().then(() => res.json("Exercise added!")).catch((err) => console.log(err.statusText));
            } else if (req.files[0].mimetype === "application/pdf" && req.files[1].mimetype === "image/png") {
                console.log("every thing is OK");
                const path = req.files[1].path;
                const FileName = req.files[1].filename;
                const pathPdf = req.files[0].path;
                const FileNamePDF = req.files[0].filename;
                const username = req.body.username;
                const description = req.body.description;
                const date = Date.parse(req.body.date);
                const NewExercise = new Exercise({ username, description, date, path, FileName, pathPdf, FileNamePDF });
                NewExercise.save().then(() => res.json("Exercise added!")).catch((err) => console.log(err.statusText));
            }
        }
        else {
            return res.json("error with files!");
        }
    });
});
router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id).then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save().then(() => res.json("Exercise updated!")).catch((err) => res.status(400).json("error" + err));
    }).catch((err) => res.status(400).json("error" + err));
});
router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id).then(() => res.json("exercise deleted!")).catch((err) => res.status(400).json("error" + err));
});
router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id).then((user) => res.json(user)).catch((err) => res.status(400).json("error" + err));
})
module.exports = router;