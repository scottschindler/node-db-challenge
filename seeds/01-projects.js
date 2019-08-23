exports.seed = function(knex, Promise) {
  return knex("projects").insert([
    {
      id: 1,
      name: "coding",
      description: "work on a projects",
      completed: false
    },
    {
      id: 2,
      name: "painting",
      description: "work on a painting project",
      completed: false
    }
  ]);
};
