const express = require("express");
require("./db/mongoose");
const env_cmd = require("env-cmd");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const PORT = process.env.PORT;

//using routers
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});
