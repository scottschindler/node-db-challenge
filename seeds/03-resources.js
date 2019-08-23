exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    {
      id: "1",
      description: "Udemy",
      project_id: 1
    },
    {
      id: "2",
      description: "Tyle McGinnes",
      project_id: 1
    },
    {
      id: "3",
      description: "FreeCodeCamp",
      project_id: 1
    },
    {
      id: "4",
      description: "Paint Store",
      project_id: 2
    },
    {
      id: "5",
      description: "Online Tutorial",
      project_id: 2
    }
  ]);
};
