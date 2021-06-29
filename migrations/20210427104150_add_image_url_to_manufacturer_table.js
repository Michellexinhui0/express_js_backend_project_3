
exports.up = function(knex) {
    return knex.raw(`alter table manufacturer add image_url text;`);
};

exports.down = function(knex) {
    return knex.raw(`alter table manufacturer drop image_url;`);
};
