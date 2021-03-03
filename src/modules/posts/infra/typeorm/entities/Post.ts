import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import uploadConfig from '../../../../../config/upload';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  photo: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  caption: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'photoUrl' })
  getImageUrl(): string | null {
    if (!this.photo) return null;
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.photo}`;
      default:
        return null;
    }
  }
}

export default Post;
