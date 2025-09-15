import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from './entities/user.entity';

export const GetUser = createParamDecorator((_: unknown, ctx: ExecutionContext): Users => {
  const req = ctx.switchToHttp().getRequest<{ user: Users }>();
  return req.user;
});
