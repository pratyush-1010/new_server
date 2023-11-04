import express from 'express';
import { addCategory, deleteCategory, getallCategories, updateCategory } from '../controller/categories.controller';

const router = express.Router();

router.post("/add",addCategory);
router.get("/allCategories",getallCategories)
router.put("/update/:id",updateCategory);
router.delete("/delete/:id",deleteCategory);

export default router