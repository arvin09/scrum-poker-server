var express = require("express");
var router = express.Router();
const ScrumPokerModel = require("../model/ScrumPokerModel");

module.exports = (io) => {
  /* GET all users. */
  router.get("/", function (req, res, next) {
    // res.send('respond with a resource');
    ScrumPokerModel.find({}, (err, messages) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ messages });
    });
  });

  /* GET users by roomId. */
  router.get("/:roomId", function (req, res, next) {
    ScrumPokerModel.find({ roomId: req.params.roomId }, (err, messages) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ messages });
    });
  });

  /* POSt users by roomId. */
  router.post("/",  (req, res) => {
    try {

      const { roomId, user } = req.body;

      ScrumPokerModel.findOne({ roomId, user }, async (err, docs) => {
        if(err) {
          console.log('ERROR HERE', err);
          res.status(500).send(err);
        } else {
          if(!docs) {
            const message = new ScrumPokerModel(req.body);
            const savedMessage = await message.save();
            console.log("saved", savedMessage);
            res.status(200).send({ savedMessage });
          } else {
            res.status(200).send({ message: 'User exists' });
          }
        }
      })

      
    } catch (error) {
      res.status(500).send(error);
      return console.log(error);
    }
  });

  /* Update story points from user */
  router.put("/", (req, res) => {
    const { roomId, user, storyPoint } = req.body;

    ScrumPokerModel.findOneAndUpdate(
      { roomId, user },
      {storyPoint},
      null,
      (err, doc) => {
        if (err) {
          res.send(err);
        }
        res.json(doc);
      }
    );
  });

  return router;
};
