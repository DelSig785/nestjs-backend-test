export class User {}
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({name: 'userId'})
    user: UserEntity;

    @ManyToOne(() => PostEntity)
    @JoinColumn({name: 'postId'})
    post: PostEntity;
}
