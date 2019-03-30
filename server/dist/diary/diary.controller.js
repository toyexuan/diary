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
const diary_service_1 = require("./diary.service");
const auth_service_1 = require("../shared/authentication/auth.service");
let DiaryController = class DiaryController {
    constructor(diaryService, authService) {
        this.diaryService = diaryService;
        this.authService = authService;
    }
    getDiaryListApi(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const diaries = yield this.diaryService.getDiaryList(body.author);
            return diaries.map(diary => ({
                _id: diary._id,
                title: diary.title,
                createdAt: diary.createdAt,
                commentsNum: diary.comments.length,
                locked: diary.locked,
                author: diary.author,
            }));
        });
    }
    getDiry(res, req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const diary = yield this.diaryService.getDiary(body._id);
            if (diary.locked) {
                const token = req.headers.jwt;
                if (!token) {
                    return res.sendStatus(400);
                }
                const valid = yield this.authService.validateUserByJwt(token);
                if (valid) {
                    return diary;
                }
                else {
                    res.sendStatus(400);
                }
            }
            return diary;
        });
    }
    postComment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.diaryService.postComment(body.comment, body.id)) !== undefined);
        });
    }
    postDiary(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.diaryService.postDiary(body.diary);
        });
    }
};
__decorate([
    common_1.Post('diary-list'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getDiaryListApi", null);
__decorate([
    common_1.Post('get-diary'),
    __param(0, common_1.Response()), __param(1, common_1.Request()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getDiry", null);
__decorate([
    common_1.Post('post-comment'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "postComment", null);
__decorate([
    common_1.Post('post-diary'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "postDiary", null);
DiaryController = __decorate([
    common_1.Controller('diary/api'),
    __metadata("design:paramtypes", [diary_service_1.DiaryService, auth_service_1.AuthService])
], DiaryController);
exports.DiaryController = DiaryController;
//# sourceMappingURL=diary.controller.js.map