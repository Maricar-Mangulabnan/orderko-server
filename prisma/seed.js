const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create one employee user
  const employee = await prisma.user.create({
    data: {
      username: "employee1",
      password: "password123",
      role: "EMPLOYEE",
    },
  });

  // Create one customer user
  const customer = await prisma.user.create({
    data: {
      username: "customer1",
      password: "password123",
      role: "CUSTOMER",
    },
  });

  // Create three products with provided image URLs and sample data
  const product1 = await prisma.product.create({
    data: {
      name: "Beige Tyra",
      imgUrl: "https://www.cln.com.ph/cdn/shop/files/Tyra_Beige_1_1024x1024.jpg?v=1740983334",
      price: 29.99,
      stock: 100,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Coffee Faustine",
      imgUrl: "https://www.cln.com.ph/cdn/shop/files/Faustine_Coffee_1_1024x1024.jpg?v=1740714571",
      price: 39.99,
      stock: 150,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Black Mitzie",
      imgUrl: "https://www.cln.com.ph/cdn/shop/files/Mitzie_Black_1_1024x1024.jpg?v=1742352685",
      price: 24.99,
      stock: 200,
    },
  });

  // Create one order record using the employee's id and product1's id
  const order = await prisma.orderRecord.create({
    data: {
      userId: employee.id,
      productId: product1.id,
      count: 2,
      totalAmount: product1.price * 2,
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
