import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async checkEmailExists(email: string): Promise<null> {
    const user = await this.userService.findOne(email);

    if (user) {
      throw new UnauthorizedException();
    }

    return null;
  }

  async signupUser(
    email: string,
    password: string,
    username: string,
  ): Promise<User | null> {
    const user = await this.userService.create({
      email,
      password,
      username,
    });
    if (user && user.password) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }
}
