const { ApiError } = require("../api/ApiError");
const cloudinary = require('./cloudinary');
const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%?&";
    let password = '';
    password += chars[Math.floor(Math.random() * 26)]; // lowercase letter
    password += chars[Math.floor(Math.random() * 26) + 26]; // uppercase letter
    password += chars[Math.floor(Math.random() * 10) + 52]; // digit
    password += chars[Math.floor(Math.random() * 6) + 62]; // special character
    for (let i = 4; i < 10; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password.split('').sort(() => 0.5 - Math.random()).join(''); // Shuffle to ensure randomness
};

const uploadImage=async(image)=>{
    let imageUrl = null;
    console.log(image);
    if (image) {
        const result = await cloudinary.uploader.upload(image.path, {
            folder: 'profile_pictures'
        });
        imageUrl = result.secure_url;
    }
return imageUrl;
}
const removeFile = async (publicId=null) => {
    if(publicId){
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`File with public ID: ${publicId} has been removed`);
    } catch (error) {
      console.error(`Failed to remove File with public ID: ${publicId}`, error);
      throw new ApiError(500,'Failed to remove image',error);
    }}
  };

module.exports ={generateRandomPassword,removeFile,uploadImage};