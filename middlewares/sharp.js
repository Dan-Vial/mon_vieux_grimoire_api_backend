import sharp from "sharp";

export default async (req, res, next) => {
  try {
    const MIME_TYPES = {
      'image/jpg': 'jpg',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    }

    const { buffer, originalname, mimetype } = req.file;
    let extension = MIME_TYPES[mimetype];

    if (!extension) {
      return res.status(401).json({ error: 'Contains unsupported image format' });
    }

    const name = originalname.split(' ').join('_');
    const ref = `${[...name.split('.')].shift()}_${Date.now()}.${extension}.webp`;

    await sharp(buffer).webp({ quality: 20 }).toFile(`./images/${ref}`);
    req.file.filename = `${ref}`;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
