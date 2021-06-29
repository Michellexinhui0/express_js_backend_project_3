
// create_product_table
exports.up = function (knex) {
    return knex.raw(
      `
        create table if not exists product (
          id int auto_increment primary key,
          name text,
          price decimal(19, 4),
          manufacturer_id int,
          foreign key (manufacturer_id) references manufacturer(id) 
      );
      `
    );
  };
  
  exports.down = function (knex) {
      return knex.raw(`drop table product;`)
  };
  
  