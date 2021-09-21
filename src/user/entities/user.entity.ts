export class User {}
import { IsEmail, IsString } from "class-validator";
import { HouseEntity } from "src/house/entities/house.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // @IsString()
    fullName: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    salary: number;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;

    @OneToMany(() => HouseEntity, house => house.user)
    house: HouseEntity[];
}
