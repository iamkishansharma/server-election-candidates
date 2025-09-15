import { UserRole } from 'src/models/auth/interfaces/user-role.enum';
import { IUsers } from 'src/models/auth/interfaces/users.interface';

export const users: IUsers[] = [
  {
    full_name: 'Admin',
    username: 'admin',
    role: UserRole.ADMIN,
    email: 'admin@admin.com',
    password: '$2y$10$LN7P2D.vvVJq8wDVU410IuL/Tu52UzLnwCtz5O4KGTE8yQAYZRV32', //admin@321
  },
];
