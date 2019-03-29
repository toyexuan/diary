"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    password: String,
    dob: String,
    name: String,
    lastLoginAt: Date,
});
//# sourceMappingURL=user.schema.js.map