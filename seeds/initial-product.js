
exports.seed = function (knex) {
  return knex.raw(
  `
  insert into product (id, name, price, manufacturer_id, description,
  image_url)
  values
  (1, "Product 1", 99.9, 1, "Description Placeholder",
  "https://via.placeholder.com/150"),
  (2, "Product 2", 90.2, 1, "Description Placeholder",
  "https://via.placeholder.com/150"),
  (3, "Product 3", 90.2, 2, "Description Placeholder",
  "https://via.placeholder.com/150"),
  (4, "Product 4", 90.2, 2, "Description Placeholder",
  "https://via.placeholder.com/150")
  as new_data
  on duplicate key update
  name=new_data.name,
  price=new_data.price,
  manufacturer_id=new_data.manufacturer_id,
  description=new_data.description,manufacturer_id=new_data.manufacturer_id;
  `
  );
  };
  