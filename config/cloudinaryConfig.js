import {v2 as cloudinary} from 'cloudinary';
import env from './env.js';
import multer from 'multer';

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = env();

          
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_API_KEY, 
  api_secret: CLOUD_API_SECRET 
});
const allowedFormats = ["jpg", "png", "jpeg", "mp4", "mov", "gif", "avi"];

// function to create Cloudinary storage
const createCloudinaryStorage = (folderName) => {
  try {
    console.log("creating cloudinary storage")
    // const cloudinaryStorage = new CloudinaryStorage({
    //   cloudinary: cloudinary,
    //   params: {
    //     folder: folderName,
    //     format: async (req, file) => file.mimetype.split("/")[1],
    //     public_id: (req, file) =>
    //       mongoose.Types.ObjectId.isValid(req.params.id)
    //         ? req.params.id
    //         : uuidv4(),
    //   },
    // });
    const cloudinaryStorage = cloudinary.createFolder(folderName, function(error, result) {
        if (error) return console.error(error);
        console.log(result);
      });
    console.log("cloudinary storage created")
    return cloudinaryStorage;
  } catch (error) {
    console.log("cloudinary",error);
    throw new Error("Error creating Cloudinary storage");
  }
};

// Filter for validating file formats
const fileFilter = (req, file, cb) => {
  const format = file.mimetype.split("/")[1].toLowerCase();
  if (allowedFormats.includes(format)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Unsupported file format. Allowed formats: ${allowedFormats.join(", ")}.`
      ),
      false
    );
  }
};

const uploadImageOptions = {
  storage: createCloudinaryStorage(`seeMeeApp`),
  limits: { fileSize: 10485760 },
  fileFilter: fileFilter,
};

const uploadVideoOptions = {
  storage: createCloudinaryStorage(`business-product-${ZAP_ENV}`),
  limits: { fileSize: 10485760 },
  fileFilter: fileFilter,
};

const uploadImage = multer(uploadImageOptions);
const uploadVideo = multer(uploadVideoOptions)

export { uploadImage, uploadVideo };
