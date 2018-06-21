export interface IEnvironment {
    readonly apiPath: string;
    readonly adminPath: string;
    readonly jwtSecret: string;
    readonly auth: {
        tokenExpiresMinutes: number;
    }
}