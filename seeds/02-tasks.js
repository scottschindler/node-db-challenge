exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    {
      id: 1,
      description: "work on my javascript",
      project_id: 1
    },
    {
      id: 2,
      description: "learn react",
      project_id: 1
    },
    {
      id: 3,
      description: "learn Node ",
      project_id: 1
    },
    {
      id: 4,
      description: "learn how to paint",
      project_id: 2
    },
    {
      id: 5,
      description: "make sure to practice painting",
      project_id: 2
    }
  ]);
};
