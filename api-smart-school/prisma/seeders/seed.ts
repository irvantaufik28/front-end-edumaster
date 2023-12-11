import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();


async function main() {
  const role = await prisma.role.create({
    data: {
      id: 1,
      name: 'administrator'
    }
  })
  const admin = await prisma.user.create({
    data: {
      id: uuidv4(),
      username: 'super_admin',
      password: await bcrypt.hash('password', 10)
    },
  });

  const admin_has_role = await prisma.userRoles.create({
    data: {
      user_id: admin.id,
      role_id: 1
    }
  })


  console.log({ role, admin, admin_has_role });
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