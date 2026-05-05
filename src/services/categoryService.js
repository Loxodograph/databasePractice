import { prisma } from "../config/db.js";

async function getAllCategories() {
  return await prisma.categories.findMany();
}

async function getCategoryById(categoryId) {
  return await prisma.categories.findUnique({
    where: { id: categoryId},
    select: { name: true },
  });
}

export { getAllCategories, getCategoryById } ;