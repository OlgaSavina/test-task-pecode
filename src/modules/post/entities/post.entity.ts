import { User } from 'src/modules/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'



@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @Column({ type: 'uuid' })
  createdBy: string;

  @Column({ type: 'text' })
  post: string;
}