import multer from "multer";

const storageconfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/resumes/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

export const uploadResume = multer({storage:storageconfig});