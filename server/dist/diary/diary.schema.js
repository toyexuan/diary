"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.DiarySchema = new mongoose_1.Schema({
    author: String,
    title: String,
    content: [String],
    createdAt: Date,
    updatedAt: Date,
    comments: [
        {
            author: String,
            content: [String],
            createdAt: Date,
        },
    ],
    bgImages: [String],
    bgm: String,
    locked: Boolean,
});
//# sourceMappingURL=diary.schema.js.map