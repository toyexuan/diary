"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user/user.controller");
const diary_controller_1 = require("./diary/diary.controller");
const mongoose_1 = require("@nestjs/mongoose");
const loader_1 = require("./config/loader");
const user_schema_1 = require("./user/user.schema");
const auth_service_1 = require("./shared/authentication/auth.service");
const auth_module_1 = require("./shared/authentication/auth.module");
const user_service_1 = require("./user/user.service");
const diary_service_1 = require("./diary/diary.service");
const diary_schema_1 = require("./diary/diary.schema");
const cache_middleware_1 = require("./shared/middlewares/cache.middleware");
const auth_middleware_1 = require("./shared/middlewares/auth.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(cache_middleware_1.CacheMiddleware)
            .forRoutes(user_controller_1.UserController)
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'diary/api/post-comment', method: common_1.RequestMethod.POST }, { path: 'diary/api/post-diary', method: common_1.RequestMethod.POST });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forRoot(new loader_1.CfgLoader(loader_1.ServerEnvironment.DEV).load().DB.Url),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Diary', schema: diary_schema_1.DiarySchema }]),
        ],
        controllers: [user_controller_1.UserController, diary_controller_1.DiaryController],
        providers: [user_service_1.UserService, auth_service_1.AuthService, diary_service_1.DiaryService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map