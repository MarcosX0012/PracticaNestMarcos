import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  // Crear Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Empresa Demo',
    },
  });


  // Encriptar contraseña
  const passwordHash = await bcrypt.hash('123456', 10);


  // Crear usuario administrador
  const user = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: passwordHash,
      telephone: '88888888',
      role: Role.ADMIN,
      tenantId: tenant.id,
    },
  });


  console.log('Tenant creado:', tenant);
  console.log('Usuario creado:', user);
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });