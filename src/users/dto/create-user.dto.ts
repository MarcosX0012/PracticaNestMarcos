import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client/wasm';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'usuario@empresa.com' })
  email: string;

  @ApiProperty({ required: true, example: 'John Doe' })
  name: string;

  username?: string;

  @ApiProperty({ required: true, example: 'password123' })
  password: string;

  @ApiProperty({ required: true, example: 1, description: 'ID del tenant' })
  tenantId: number;

  @ApiProperty({
    required: true,
    enum: Role,
    example: 'USER'
  })
  role: Role;
}

