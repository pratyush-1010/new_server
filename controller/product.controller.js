import Products from "../model/product.model";
import upload from "../multerConfig";
import fs from "fs-extra"

export const addProduct = async (req, res) => {
  upload.array("proImage", 10)(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const {
      proName,
      proSku,
      proDesc,
      stock,
      category,
      proPrice,
      proStatus,
    } = req.body;

    var imageArr = [];
    req?.files?.map((element) => {
      imageArr.push(element.filename);
    });

    try {
      const product = new Products({
        proName,
        proSku,
        proDesc,
        stock,
        category,
        proPrice,
        proStatus,
        proImage: imageArr,
      });
      const saveData = await product.save();

      res.status(201).json({
        message: "Product Saved Successfully",
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

export const getallProducts = async (req, res) => {
  const getProduct = await Products.find();

  if (getProduct) {
    res.status(200).json({
      data: getProduct,
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

export const updateProduct = async (req, res) => {
  upload.array("proImage", 10)(req, res, async (err) => {
    if (err) {
      return res.status(500).res.json({
        error: err.message,
      });
    }

    const {
      proName,
      proSku,
      proDesc,
      stock,
      category,
      proPrice,
      proStatus,
    } = req.body;

    var imageArr = [];
    req?.files?.map((element) => {
      imageArr.push(element.filename);
    });

    const ProductId = req.params.id;

    try {
      const product = await Products.findById(ProductId);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }

      const oldImageArr = product.proImage; 

      oldImageArr.forEach((oldImage) => {
        if (!imageArr.includes(oldImage)) {
          fs.unlink(`./uploads/${oldImage}`, (err) => {
            if (err) {
              console.error(`Error unlinking ${oldImage}:`, err);
            } else {
              console.log(`${oldImage} unlinked successfully`);
            }
          });
        }
      });

      product.proName = proName;
      product.proSku = proSku;
      product.proDesc = proDesc;
      product.stock = stock;
      product.category = category;
      product.proPrice = proPrice;
      product.proStatus = proStatus;
      product.proImage = imageArr;

      const updateProduct = await product.save();
      res.status(200).json({
        message: "Product updated successfully",
        data: updateProduct,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  });
};

export const singleProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Products.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Found", data: product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productDelete = await Products.findByIdAndDelete(_id, req.body);
    fs.unlinkSync("uploads/" + productDelete.proImage);
    res.status(200).json({
        message: "deleted successfully",
        data: productDelete,
      });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

export const getProByCategory = async (req, res) => {
    const categoryId = req.params.category;
    // console.log(categoryId)
    try {
      const products = await Products.find({ category: categoryId });
      res.status(200).json({
        message: "Product List",
        data: products,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  };



