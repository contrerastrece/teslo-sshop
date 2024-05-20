import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // console.log(initialData)

  // 1- Borrar Registros previos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;
  // categories
  // await prisma.category.create({
  //   data: {
  //     name: "blusa",
  //   },
  // });
  const categoriesData = categories.map((category) => ({ name: category }));
  // console.log(categoriesData,'🏴')
  // console.log(categories)

  await prisma.category.createMany({
    data: categoriesData,
  });

  // obtener todas las categorias
  const categoriesDB = await prisma.category.findMany();
  // console.log(categoriesDB, "🚩");

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt,string=categoryID>

  // console.log(categoriesMap);

  // Products
  // insertar 1 product
  const {images,type,...rest}=products[0];
  // console.log(images,type)
await prisma.product.create({
  data:{
    ...rest,
    categoryId:categoriesMap[type]
  }

})



  console.log("Seed ejecutado correctamente");


}

(() => {
  // if(process.env.NODE_ENV==="production") return;
  // console.log(process.env.NODE_ENV);
  main();
})();
