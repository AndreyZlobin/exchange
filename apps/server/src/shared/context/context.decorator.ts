import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserContext } from "@shared/context/user.context";

interface RequestWithUserData extends Request {
  userContext: {
    userId: UserContext["userId"];
    username: UserContext["username"];
  };
}

export const Context = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<RequestWithUserData>();

  return req.userContext;
});
