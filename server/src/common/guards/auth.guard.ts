import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();

    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    return isAuthenticated;
  }
}
