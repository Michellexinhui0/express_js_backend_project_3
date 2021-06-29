// Update with your config settings.

module.exports = {

  development: {
    client: "mysql", 
    connection: { 
    host: "student-mysql.ccttwiegufhh.us-east-2.rds.amazonaws.com", user: "studentmysql", 
    password: "studentmysql", 
    database: "michelle_database", 
    },     
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
