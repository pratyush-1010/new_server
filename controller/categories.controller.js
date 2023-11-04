import CategorySchema from "../model/category.model";
import upload from "../multerConfig"
import fs from "fs-extra"

export const addCategory = (req, res) => {
  upload.single("categoryImage")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { categoryName, categoryDescription, categoryStatus } = req.body;

    const categoryImage = req.file.filename
    try {
      const category = new CategorySchema({
        categoryName,
        categoryDescription,
        categoryImage,
        categoryStatus,
      });
      const saveData = await category.save();

      res.status(201).json({
        message: "Category Saved Successfully",
        data: saveData,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  });
};

export const getallCategories = async (req, res) => {
  const getCategories = await CategorySchema.find();

  if (getCategories) {
    res.status(200).json({
      data: getCategories,
      message: "Success",
      path: "http://localhost:4000/uploads/",
    });
  } else {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
};


export const updateCategory = (req, res) => {
  upload.single("categoryImage")(req, res, async (err) => {
    if (err) {
      // Handle any multer errors
      return res.status(500).json({ error: err.message });
    }

    const { categoryName, categoryDescription, categoryStatus } = req.body;
    const categoryImage = req.file.filename
    const categoryId = req.params.id; // Assuming you're passing the category ID in the URL params

    try {
      // Find the category by ID and update its properties
      const category = await CategorySchema.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const oldImage = category.categoryImage; 
      if(oldImage){
        fs.unlink(`./uploads/${oldImage}`,(err)=>{
          if(err){
            console.log(err);
          }else{
            console.log(`${oldImage} unlinked successfully`);
          }
        })
      }

      category.categoryName = categoryName;
      category.categoryDescription = categoryDescription;
      category.categoryImage = categoryImage;
      category.categoryStatus = categoryStatus;

      // Save the updated category
      const updatedCategory = await category.save();

      res.status(200).json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  });
};


export const deleteCategory = async(req,res)=>{
  try{
    const _id = req.params.id;
    const catogoryDelete = await CategorySchema.findByIdAndDelete(_id,req.body);
    fs.unlinkSync('uploads/'+catogoryDelete.categoryImage)
    res.send(catogoryDelete);
  }catch(err){
    res.status(400).send(err)
    console.log(err)
  }
}
