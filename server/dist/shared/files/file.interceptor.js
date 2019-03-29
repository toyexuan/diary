"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const common_1 = require("@nestjs/common");
const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './public/resources/upload'),
    filename: (req, file, callback) => callback(null, file.originalname)
});
const fileFilter = (req, file, callback) => {
    const filename = file.originalname.split('.');
    const ext = filename[filename.length - 1];
    if (['jpg', 'jpeg', 'bmp', 'png'].includes(ext.toLowerCase()))
        callback(null, true);
    else
        callback('Unexpected type of file', false);
};
exports.multerOptions = {
    storage,
    fileFilter,
    limits: {
        files: 1
    }
};
exports.ImageInterceptor = common_1.FileInterceptor('image', exports.multerOptions);
//# sourceMappingURL=file.interceptor.js.map