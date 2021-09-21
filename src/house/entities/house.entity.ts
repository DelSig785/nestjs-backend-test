// import { IsNumber } from "class-validator";
import { IsNumber } from "class-validator";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('houses')
export class HouseEntity {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;
    
    @Column()
    @IsNumber()
    userId?: number;
    
    @Column()
    address: string;

    @Column()
    cost: number;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.house, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'houseId'})
    user: UserEntity
}

