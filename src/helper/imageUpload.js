import uploader from "../config/claudanary.js"
const articleImage = async (req) => {
  try {
    const tmp = req.files.image.tempFilePath;
    const Result = await uploader.upload(
      tmp,
      { folder: "My-Brand" },
      (_, result) => result
    );
    return Result;
  } catch (error) {
    console.log(error);
  }
};
export default articleImage