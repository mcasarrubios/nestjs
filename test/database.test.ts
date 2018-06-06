import { TypeOrmModule } from '@nestjs/typeorm';

export const testDatabase = (entities) => {
    return TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        entities: entities || []
    })
}