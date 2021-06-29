
exports.seed = function (knex) {
  return knex.raw(
  `
  insert into manufacturer (id, name, image_url)
  values (1, "Lego", "https://via.placeholder.com/150"), (2,
  "Disney", "https://via.placeholder.com/150")
  as new_data
  on duplicate key update
  name=new_data.name, image_url=new_data.image_url;
  `
  );
  };
