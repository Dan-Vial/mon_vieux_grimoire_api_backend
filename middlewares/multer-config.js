import multer, { diskStorage } from 'multer';
import sharp from "sharp";

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
//   'image/webp': 'webp',
// };

// const storage = diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, [...name.split('.')].pop() + Date.now() + '.' + extension);
//   }
// });

const storage = multer.memoryStorage();

export default multer({ storage: storage }).single('image');