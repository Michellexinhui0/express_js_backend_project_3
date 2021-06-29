// add_description_to_product_table
exports.up = function(knex) {
    return knex.raw(`alter table product add description text;`);
};
  
exports.down = function(knex) {
    return knex.raw(`alter table product drop description;`);
};

