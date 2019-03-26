import * as multer from 'multer';
import { Validator } from 'class-validator';
import { FileInterceptor } from '@nestjs/common';

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './public/resources/upload'),
    filename: (req, file, callback) => callback(null, file.originalname)
});

const fileFilter = (req, file, callback) => {
    const filename = file.originalname.split('.');
    const ext = filename[filename.length - 1];
    if (['jpg', 'jpeg', 'bmp', 'png'].includes(ext.toLowerCase())) callback(null, true);
    else callback('Unexpected type of file', false); 
}

export const multerOptions = {
    storage,
    fileFilter,
    limits: {
        files: 1
    }
};

export const ImageInterceptor = FileInterceptor('image', multerOptions);