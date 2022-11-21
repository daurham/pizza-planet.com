"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
exports.default = prisma;
