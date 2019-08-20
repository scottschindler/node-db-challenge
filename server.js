const express = require("express");

const db = require("./data/db-config.js");

const server = express();

server.use(express.json());

server.get("/api/projects", async (req, res) => {
  // get all species from the database
  try {
    const projects = await db("projects");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// server.get("/api/animals", async (req, res) => {
//   // get all animals from the database
//   try {
//     // include species name
//     const animals = await db("animals").leftJoin(
//       "species",
//       "species.id",
//       "species_id"
//     );

//     res.status(200).json(animals);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// create animal
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

// remove species
server.delete("/api/species/:id", async (req, res) => {
  try {
    const count = await db("species")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
