import { TYPES } from "@DI/types";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { IPrismaService } from "@src/database";
import { tap } from "rxjs/operators";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    @Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService,
    @Inject(TYPES.DB.RedisService) private readonly redisService: IPrismaService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    // const user = await this.prismaService.log.findFirst();

    // const username = req.headers["username"] || req.query.username;
    // const userId = req.headers["user-id"] || req.query.userId;

    // const userContext = new UserContext();

    // userContext.setUsername(username);
    // userContext.setUserId(userId);
    // userContext.setUser(user);

    // req.userContext = userContext;

    return next.handle().pipe(
      tap(() => {
        delete req.userContext;
      }),
    );
  }
}
