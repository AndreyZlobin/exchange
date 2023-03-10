export const TYPES = {
  services: {
    LoggerService: Symbol.for('LoggerService'),
    ConfigService: Symbol.for('ConfigService'),
    JWTService: Symbol.for('JWTService'),
    BcryptService: Symbol.for('BcryptService'),
    DateService: Symbol.for('DateService'),
    CronService: Symbol.for('CronService'),
    BotService: Symbol.for('BotService'),
    HttpService: Symbol.for('HttpService'),
  },
  integration: {
    GarantexService: Symbol.for('GarantexService'),
    BinanceService: Symbol.for('BinanceService'),
  },
  DB: {
    RedisService: Symbol.for('RedisService'),
    PrismaService: Symbol.for('PrismaService'),
    MongoService: Symbol.for('MongoService'),
  },
  auth: {
    AuthController: Symbol.for('AuthController'),
    AuthRepository: Symbol.for('AuthRepository'),
    AuthCacheService: Symbol.for('AuthCacheService'),
    AuthService: Symbol.for('AuthService'),
  },
  user: {
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService'),
  },
  order: {
    OrderService: Symbol.for('OrderService'),
    OrderRepository: Symbol.for('OrderRepository'),
  },
  wallet: {
    WalletService: Symbol.for('WalletService'),
    WalletRepository: Symbol.for('WalletRepository'),
  },
};
