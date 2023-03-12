import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContext } from '@shared/context/user.context';

interface RequestWithUserData extends Request {
  userContext: {
    userId: UserContext['userId'];
  };
}

export const Context = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return context.switchToHttp().getRequest<RequestWithUserData>().userContext;
});
