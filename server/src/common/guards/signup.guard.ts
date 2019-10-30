import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SignupGuard extends AuthGuard('local-signup') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
