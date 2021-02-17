import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';

@Entity('friends')
class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  friend_id1: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'friend_id1' })
  friend1: User;

  @Column()
  friend_id2: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'friend_id2' })
  friend2: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Friend;
