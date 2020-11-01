const router = require("express").Router();
const Transaction = require("../models/workoutmodel.js");
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
 });
 
 router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
 });
 
 router.get("/exercise?", (req, res) => {
    res.sendFile(__dirname + "../public/exercise.html");
 });
 
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
 });

router.get("/api/workouts", (req, res) => {
    Transaction.find({})
        .sort({ day: -1 })
       .then(workoutdb => {
          res.json(workoutdb);
       })
       .catch(err => {
          res.json(err);
       });
  });
  
  router.put("/api/workouts/:id", ({ params, body }, res) => {
    console.log(body);
    Transaction.findByIdAndUpdate(params.id,
       {
          $push: {
             exercises: body,
          },
       },
       {
          new: true,
          runValidators: true
       }
    ).then(workoutdb => {
          res.json(workoutdb);
       })
       .catch(err => {
          res.json(err);
       });
  });
  
  router.post("/api/workouts", ({ body }, res) => {
    console.log(body);
    Transaction.create(body)
       .then(workoutdb => {
          res.json(workoutdb);
       })
       .catch(err => {
          res.json(err);
       });
  
    res.send("Recieved a POST request")
  });
  
  router.get("/api/workouts/range", (req, res) => {
    Transaction.find({}).limit(7)
       .then(workoutdb => {
          res.json(workoutdb);
       })
       .catch(err => {
          res.json(err);
       });
  });

  module.exports = router;