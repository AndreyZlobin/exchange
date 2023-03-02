"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("reflect-metadata");
var types_1 = require("@DI/types");
var core_1 = require("@nestjs/core");
var exceptions_1 = require("@shared/exceptions");
var app_module_1 = require("@src/app.module");
// console.log("werwerwer");
var Bootstrap = /** @class */ (function () {
    function Bootstrap() {
    }
    Bootstrap.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app, prismaService, redisService, config, logger, port, prefix, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                    case 1:
                        app = _a.sent();
                        prismaService = app.get(types_1.TYPES.DB.PrismaService);
                        redisService = app.get(types_1.TYPES.DB.RedisService);
                        config = app.get(types_1.TYPES.services.ConfigService);
                        logger = app.get(types_1.TYPES.services.LoggerService);
                        port = Number(config.get("PORT"));
                        prefix = config.get("API_VERSION");
                        app.setGlobalPrefix("api/".concat(prefix, "/"));
                        app.useGlobalFilters(new exceptions_1.ValidationExceptionFilter(logger));
                        return [4 /*yield*/, Promise.all([prismaService.$connect(), redisService.$connect()])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prismaService.enableShutdownHooks(app)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, app.listen(port)];
                    case 4:
                        _a.sent();
                        // const data = await prismaService.log.findMany();
                        //
                        // console.log(data);
                        // const data = await prismaService.client.log.create({
                        //   data: {
                        //     action: "123123",
                        //     source: "123123",
                        //     created: Date.now(),
                        //     data: {},
                        //   },
                        // });
                        logger.log("[Server]: Server was started on PORT ".concat(port, " | http://localhost:").concat(port));
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        process.exit(1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Bootstrap;
}());
var bootstrap = new Bootstrap();
bootstrap.start();
