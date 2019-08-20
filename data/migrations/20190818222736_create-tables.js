//
// note the .notNullable() and .unique() chainable
// methods in the knex Schema Builder... these allow us
// to specify a column as unique and not-nullable (duh).
//
// Also note the 2 different syntaxes for specifying what a
// foreign key field references in another table:
//
//    .references('primary_key').inTable('parent_table_name')
//    .references('parent_table_name.primary_key')
//
// Also note that there is a knex Schema Builder method called
// "foreign()" that supports a completely different syntax:
//
//     tbl.foreign('column_name').references('parent_table_name.primary_key')
//
// Note that you need to create the tables in the rigth order...
// parent tables must be created before child tables can create foreign_key
// columns that reference them.
//

exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.string("description", 128).notNullable();
      //tbl.boolean("completed").defaultTo(false);
    })

    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("description", 128).notNullable();
      tbl.string("notes", 256);
      //tbl.boolean("completed").defaultTo(false);

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id");
    })

    .createTable("resources", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable();

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id");
    })

    .createTable("projects-tasks-resources", tbl => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id");

      tbl
        .integer("task_id")
        .unsigned()
        .notNullable()
        .references("tasks.id");

      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resources.id");

      tbl.primary(["project_id", "task_id", "resource_id"]);
    });
};

//
// it is critical to dropTable() in the correct order!
// it doesn't have to be in the exact reverse order from how
// they were created... you just have to take care not to drop
// parent tables before you drop child tables that have foreign
// key columns that reference them.
//
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("projects-tasks-resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
