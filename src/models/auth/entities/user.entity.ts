import { HasTimestamps } from 'src/database/interfaces/HasTimestamps';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUsers } from '../interfaces/users.interface';
import { UserRole } from '../interfaces/user-role.enum';

@Entity()
export class Users extends HasTimestamps implements IUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GENERAL_USER,
  })
  role: UserRole;

  @Column()
  email: string;

  @Column()
  password: string;
}
