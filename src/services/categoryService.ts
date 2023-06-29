import { prisma } from "@/src/lib/prisma";

export async function getCategoriesForPills() {
  return prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });
}
