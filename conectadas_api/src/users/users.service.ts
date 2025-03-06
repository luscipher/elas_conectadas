import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //registra um novo usuário
  async createUser(data: Prisma.UserCreateInput, role: 'USER' | 'ADMIN') {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword, role },
    });
  }

  // faz a validação do usuário
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  //retorna todos os usuários
  getUsers() {
    return this.prisma.user.findMany();
  }

  //retorna um usuário por id
  getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  //atualiza os dados de um usuário por id
  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User Not Found', 404);

    if (data.email && data.email !== findUser.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: data.email as string },
      });
      if (existingEmail) throw new HttpException('Email already taken', 400);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  //remove o usuário do banco de dados
  async deleteUser(id: number) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return this.prisma.user.delete({ where: { id } });
  }
}