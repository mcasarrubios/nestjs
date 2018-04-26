export interface IEnvironment {
    readonly jwtSecret: string;
    readonly auth: {
        tokenExpiresMinutes: number;
    }
}