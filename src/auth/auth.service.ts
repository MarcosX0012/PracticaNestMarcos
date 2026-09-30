import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {

  console.log('LOGIN RECIBIDO:', user);

  const foundUser = await this.prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });


  console.log('USUARIO ENCONTRADO:', foundUser);


  if (!foundUser) {
    console.log('NO EXISTE USUARIO');
    return null;
  }


  const isPasswordValid = await bcrypt.compare(
    user.password,
    foundUser.password,
  );


  console.log('PASSWORD CORRECTA:', isPasswordValid);


  if (isPasswordValid) {

  console.log("PASSWORD CORRECTA");

  const token = this.jwtService.sign({
    id: foundUser.id,
    email: foundUser.email,
    role: foundUser.role,
  });

  console.log("TOKEN GENERADO:", token);

  return token;

} else {
  console.log("PASSWORD INCORRECTA");
  throw new UnauthorizedException('Credenciales inválidas');
}
  }
}