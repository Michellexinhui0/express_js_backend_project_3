
exports.up = function(knex) {
    return knex.raw(`alter table product add image_url text;`);
};

exports.down = function(knex) {
    return knex.raw(`alter table product drop image_url;`);
};
