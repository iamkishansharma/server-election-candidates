/**
 * Users variable type declaration.
 *
 * @interface
 */
import { UserRole } from './user-role.enum';

export interface IUsers {
  id?: string;
  full_name: string;
  username: string;
  role: UserRole;
  email: string;
  password: string;
  created_at?: Date; // if HasTimestamps adds these
  updated_at?: Date;
}
