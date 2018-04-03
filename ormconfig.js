const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

module.exports = {
    type: 'sqlite',
    database: './db/myDatabase.db',
    entities: [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
}

module.exports = {
    'type': 'postgres',
    'host': 'localhost',
    'port': 5432,
    'username': 'devuser',
    'password': 'q12345',
    'database': 'nestjs',
    'entities': [`${SOURCE_PATH}/**/**.entity{.ts,.js}`]
 }