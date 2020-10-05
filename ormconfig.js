const env = process.env.NODE_ENV;
let entities = [];

switch(env) {
  case 'local': 
    entities = ['src/app/entity/*.ts'];
    break;
  case 'development':
    entities = ['dist/app/entity/*.js']
    break;
}

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test_movie',
  synchronize: false,
  logging: false,
  entities: entities,
  migrations: ['src/app/migration/*.ts'],
  subscribers: ['src/app/subscriber/*.ts'],
};
