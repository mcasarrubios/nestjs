import { IDatabaseConnection } from '../database-connection.interface';

export interface IEnvironment {
    readonly apiPath: string;
    readonly adminPath: string;
    readonly jwtSecret: string;
    readonly auth: {
        tokenExpiresMinutes: number;
    },
    readonly databases: {
        sql: IDatabaseConnection,
        mongo: IDatabaseConnection
    }
}