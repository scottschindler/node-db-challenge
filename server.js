const express = require("express");

const db = require("./data/db-config.js");

const server = express();

server.use(express.json());

//get projects
server.get("/api/projects", async (req, res) => {
  // get all species from the database
  try {
    const projects = await db("projects");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a project by id
server.get("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [project] = await db("projects").where({ id });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: "Could not find the specified food item in database 🤷‍"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error retrieving the requested info from database 💩",
      error: err
    });
  }
});

// create project
server.post("/api/projects", async (req, res) => {
  try {
    const [id] = await db("projects").insert(req.body);

    const project = await db("projects")
      .where({ id })
      .first();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get tasks by project id
server.get("/api/projects/:id/tasks", async (req, res) => {
  console.log("endpoint hit");
  try {
    const project_id = req.params.id;
    const tasks = await db("tasks").where({ project_id });
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// create task

server.post("/api/projects/:id/tasks", async (req, res) => {
  console.log("endpoint hit");
  try {
    //const [id] = await db("tasks").insert(req.body);

    const proj_id = req.params.id;
    const task = await db("tasks").insert(req.body);

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get resources

server.get("/api/projects/:id/resources", async (req, res) => {
  console.log("endpoint hit");
  try {
    const project_id = req.params.id;
    const resources = await db("resources").where({ project_id });
    console.log(resources);
    res.status(200).json(resources);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// create resource

server.post("/api/projects/:id/resources", async (req, res) => {
  try {
    //const [id] = await db("tasks").insert(req.body);

    const proj_id = req.params.id;
    const resource = await db("resources").insert(req.body);

    res.status(201).json(resource);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = server;
