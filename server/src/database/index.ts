import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// console.log('prisma method:', prisma.movie.findMany().then(console.log));
// prisma.$connect().then(() => console.log('connected'));

// async function main() {
//   // await func();
//   // prisma.$connect();
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export default prisma;