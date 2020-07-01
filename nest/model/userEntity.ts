import {PrimaryGeneratedColumn ,Entity ,Column} from "typeorm";

@Entity()
export class User {


@PrimaryGeneratedColumn()
    user_id: number;

@Column()
    email: string;

@Column()
    name: string;

@Column()
    date_of_birth: string;

@Column()
    level: number;

    @Column()
    balance: number;

}