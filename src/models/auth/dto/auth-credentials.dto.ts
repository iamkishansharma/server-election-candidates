import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { isUnique } from 'src/decorators/is-unique';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  full_name: string;

  @IsString()
  @isUnique({ column: 'username', tableName: 'users' })
  @MinLength(3)
  @MaxLength(12)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak.',
  })
  password: string;
}
