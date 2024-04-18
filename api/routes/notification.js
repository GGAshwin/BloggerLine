const router = require("express").Router();
const Notification = require("../models/Notification");

// Get Notification
router.get("/", async (req, res) => {
  try {
    const nots = await Notification.find();
    res.status(200).json(nots);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST Notification
router.post("/", async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    console.log(newNotification);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification); // Created (201) status with the saved notification
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating notification" }); // Internal Server Error (500) with error message
  }
});

// Send the notification via Mail
router.get("/send", async (req, res) => {
  console.log("Received");
});

// Unsubscribe from the Notification Service
router.delete("/unsubscribe/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification.username === req.body.username) {
      try {
        await notification.delete();
        res.status(200).json("UNSUBSCRIPTION SUCCESSFUL");
      } catch (error) {
        console.log(error);
        res.status(500).json("Some Error Occured");
      }
    } else {
      res.status(401).json("Some Error Occured");
    }
  } catch (error) {}
});

module.exports = router;
