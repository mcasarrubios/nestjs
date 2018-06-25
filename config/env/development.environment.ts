'use strict';
const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

export var config = {
    apiPath: 'v1',
    adminPath: 'admin',
    jwtSecret: 'f_a(C}1$rwSSz5P.4n+YDDAbqU(|4z!%',
    databases: {
        sql: {
            'name': 'sql',
            'type': 'postgres',
            'host': 'localhost',
            'port': 5432,
            'username': 'devuser',
            'password': 'q12345',
            'database': 'nestjs',
            'entities': [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
            'synchronize': true
        }, 
        mongo: {
            'name': 'mongo',
            'type': 'mongodb',
            'host': 'localhost',
            'port': 27017,
            'username': 'devuser',
            'password': 'q12345',
            'database': 'nestjs',
            'entities': [`${SOURCE_PATH}/**/**.entity-mongo{.ts,.js}`],
            'synchronize': true
        }
    }
};