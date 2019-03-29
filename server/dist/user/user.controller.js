"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../shared/authentication/auth.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    getUserProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const sign = req.headers.jwt;
            if (!sign) {
                return {};
            }
            const user = yield this.authService.validateUserByJwt(sign);
            if (!user) {
                return {};
            }
            return {
                name: user.name,
                userId: user._id,
            };
        });
    }
    login(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.login(body.password);
            if (!user) {
                response.sendStatus(400);
            }
            else {
                const signedUser = yield this.authService.createJwtToken(body.password);
                response.set('jwt', signedUser.access_token);
                user.lastLoginAt = new Date();
                yield user.save();
                const userProfile = {
                    name: user.name,
                    userId: user._id,
                };
                response.send(userProfile);
            }
        });
    }
};
__decorate([
    common_1.Get('user-profile'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    common_1.Post('user-login'),
    __param(0, common_1.Response()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    common_1.Controller('user/api'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map