const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const auth = require("../middleware/auth");

//creating tasks
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

//finding tasks //get tasks?completed=true
//get /tasks?limit=10&skip=0
//get /tasks?sortBy=createdAt_asc
router.get("/tasks", auth, async (req, res) => {
  //  const task = await Task.find({ owner: req.user._id });
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  await req.user
    .populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    })
    .execPopulate();
  try {
    res.send(req.user.tasks);
  } catch (e) {
    res.status(505).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(404).send();
  }
});
//update task
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => (task[update] = req.body[update]));
    task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete task
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: "Id not found" });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
