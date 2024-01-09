import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const orderCreatedState = await prisma.orderState.upsert({
    create: {
      id: 1,
      name: "Ordine creato",
      cssBadgeClass: "badge-primary",
    },
    update: {},
    where: {
      id: 1,
    },
  });

  const orderPaidState = await prisma.orderState.upsert({
    create: {
      id: 2,
      name: "Ordine pagato",
      cssBadgeClass: "badge-success",
    },
    update: {},
    where: {
      id: 2,
    },
  });

  const orderDeletedState = await prisma.orderState.upsert({
    create: {
      id: 3,
      name: "Ordine cancellato",
      cssBadgeClass: "badge-danger",
    },
    update: {},
    where: {
      id: 3,
    },
  });

  await prisma.setting.upsert({
    create: {
      id: 1,
      siteTitle: "Fittizzio",
      siteSubtitle: "Ristorante | Pizzeria",
      orderStateCreatedId: orderCreatedState.id,
      orderStateDeletedId: orderDeletedState.id,
      orderStatePaidId: orderPaidState.id,
    },
    update: {},
    where: {
      id: 1,
    },
  });

  await prisma.category.upsert({
    create: {
      id: 1,
      name: "Pizze",
      slug: "pizze",
    },
    update: {},
    where: {
      id: 1,
    },
  });
  await prisma.category.upsert({
    create: {
      id: 2,
      name: "Panini",
      slug: "panini",
    },
    update: {},
    where: {
      id: 2,
    },
  });
  await prisma.category.upsert({
    create: {
      id: 3,
      name: "Contorni",
      slug: "contorni",
    },
    update: {},
    where: {
      id: 3,
    },
  });
  await prisma.category.upsert({
    create: {
      id: 4,
      name: "Bibite e bevande",
      slug: "bibite-e-bevande",
    },
    update: {},
    where: {
      id: 4,
    },
  });
  await prisma.category.upsert({
    create: {
      id: 5,
      name: "Dolci e dessert",
      slug: "dolci-e-dessert",
    },
    update: {},
    where: {
      id: 5,
    },
  });

  await prisma.food.upsert({
    create: {
      id: 1,
      name: "Margherita",
      price: 3.5,
      ingredients: "pomodoro, mozzarella, origano",
      categoryId: 1,
    },
    update: {},
    where: {
      id: 1,
    },
  });

  await prisma.food.upsert({
    create: {
      id: 2,
      name: "Capricciosa",
      price: 4.5,
      ingredients: "pomodoro, mozzarella, funghi, prosciutto cotto, uovo",
      categoryId: 1,
    },
    update: {},
    where: {
      id: 2,
    },
  });

  await prisma.food.upsert({
    create: {
      id: 3,
      name: "Porzione patatine piccola",
      price: 1.5,
      ingredients: "patatine surgelate",
      categoryId: 2,
    },
    update: {},
    where: {
      id: 3,
    },
  });
  await prisma.food.upsert({
    create: {
      id: 4,
      name: "Porzione patatine grande",
      price: 3.0,
      ingredients: "patatine surgelate",
      categoryId: 2,
    },
    update: {},
    where: {
      id: 4,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
