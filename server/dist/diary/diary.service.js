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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let DiaryService = class DiaryService {
    constructor(diaryModel) {
        this.diaryModel = diaryModel;
    }
    getDiaryList(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.diaryModel.find({ author }).exec();
        });
    }
    getDiary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = mongoose_3.Types.ObjectId(id);
            return yield this.diaryModel.findOne({ _id }).exec();
        });
    }
    postComment(comment, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = mongoose_3.Types.ObjectId(id);
            const diary = yield this.diaryModel.findOne({ _id }).exec();
            if (!diary) {
                throw new Error(`Cannot find diary for ${id}`);
            }
            diary.comments.push(comment);
            return yield diary.save();
        });
    }
    postDiary(diary) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = diary;
            if (_id) {
                const existDiary = yield this.diaryModel
                    .findOne({ _id: mongoose_3.Types.ObjectId(_id) })
                    .exec();
                if (existDiary) {
                    existDiary.content = diary.content;
                    existDiary.locked = diary.locked;
                    existDiary.title = diary.title;
                    existDiary.updatedAt = new Date();
                    return yield existDiary.save();
                }
                else {
                    throw new common_1.HttpException('No diary found', 400);
                }
            }
            else {
                const d = new this.diaryModel(diary);
                return yield d.save();
            }
        });
    }
};
DiaryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Diary')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DiaryService);
exports.DiaryService = DiaryService;
//# sourceMappingURL=diary.service.js.map