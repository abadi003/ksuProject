import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../model/userEntity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12a n f012345',
            database: 'book',
            entities: [User],
            synchronize: true,
        }),
    ],
})
export class AppModule {}