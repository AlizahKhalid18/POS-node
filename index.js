const express = require("express");
const cors = require("cors");
const connectDB = require("./config.js");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


let tasks = [];

async function addTask(req, res, next) {
  let { body } = req;
  tasks.push(body);
  res.send({ status: "OK", tasks });
}

function updateTaskById(req, res, next) {
  const { body } = req;
  const uniqueid = req.query.id;

  function findtask(task) {
    return task.id === uniqueid;
  }

  let task = tasks.find(findtask);

  if (!task) {
    return res.status(404).send({ status: "Error", message: "Task not found" });
  }

  let index = tasks.findIndex(x => x.id === task.id);

  // Merge the updated fields into the existing task object
  tasks[index] = { ...task, ...body };

  res.send({ status: "OK", tasks });
}

function deleteTaskById(req, res, next) {
  const uniqueid = req.query.id;

  if (!uniqueid) {
    return res.status(400).send({ status: "Error", message: "ID is required" });
  }

  let index = tasks.findIndex((x) => x.id === uniqueid);

  if (index === -1) {
    return res.status(404).send({ status: "Error", message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.send({ status: "OK", tasks });
}

app.post("/storetasks", addTask);
app.put("/updatetaskbyid", updateTaskById);
app.delete("/deletetaskbyid", deleteTaskById);

app.listen(4001, () => {
  console.log("Application is running on port 4001");
});
