// create_manufacturer_table 
exports.up = function(knex) { 
    return knex.raw( 
    ` 
    create table if not exists manufacturer ( id int auto_increment primary key, 
    name text 
    ); 
    ` 
    ); 
}; 

exports.down = function(knex) { 
    return knex.raw( 
    ` 
    drop table manufacturer; 
    ` 
    ); 
}; 
    
