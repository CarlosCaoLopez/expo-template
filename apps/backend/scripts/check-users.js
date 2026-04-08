const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const total = await prisma.user.count();
  console.log(`TOTAL_USERS=${total}`);

  if (total > 0) {
    const users = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    console.log(JSON.stringify(users, null, 2));
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
