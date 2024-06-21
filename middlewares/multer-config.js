import multer, { diskStorage } from 'multer';

const storage = multer.memoryStorage();

export default multer({ storage: storage }).single('image');