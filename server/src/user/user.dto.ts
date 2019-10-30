import { User } from './user.entity';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly username: string;
}

export class UserResponseDto {
  readonly user: User;
}
