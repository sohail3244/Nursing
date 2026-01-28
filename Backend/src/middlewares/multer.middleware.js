import multer from "multer";
import path from "path";
import fs from "fs";

// 🔹 Dynamic folder creator
const createStorage = (folderName) => {
  const uploadPath = `uploads/${folderName}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const unique =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    },
  });
};

// 🔹 Image filter
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"), false);
  }
  cb(null, true);
};

// 🔹 Reusable uploader
export const upload = (folderName) =>
  multer({
    storage: createStorage(folderName),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter,
  });
