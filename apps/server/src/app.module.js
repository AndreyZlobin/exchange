"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var auth_1 = require("@common/auth");
var configs_1 = require("@common/configs");
var date_1 = require("@common/date");
var logger_1 = require("@common/logger");
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var context_1 = require("@shared/context");
var interceptors_1 = require("@shared/interceptors");
var middleware_1 = require("@shared/middleware");
var core_module_1 = require("@src/core/core.module");
var roles_1 = require("@src/core/roles");
var prisma_module_1 = require("@src/database/prisma/prisma.module");
var redis_module_1 = require("@src/database/redis/redis.module");
var app_controller_1 = require("./app.controller");
function getProviders() {
    return [
        context_1.UserContext,
        { provide: core_1.APP_INTERCEPTOR, useClass: interceptors_1.UserInterceptor },
        { provide: core_1.APP_GUARD, useClass: roles_1.RolesGuard },
    ];
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(middleware_1.AuthenticationMiddleware).forRoutes("*");
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                prisma_module_1.PrismaModule,
                configs_1.ConfigModule,
                logger_1.LoggerModule,
                redis_module_1.RedisModule,
                date_1.DateModule,
                core_module_1.CoreModule,
                auth_1.BcryptModule,
                auth_1.JwtModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: getProviders()
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
