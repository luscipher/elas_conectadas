import {
  Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe,
  Patch, Post, UsePipes, ValidationPipe
} from '@nestjs/common';
import { CreateAdminDto } from './dtos/CreateAdmin.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto, 'USER');
  }

  //cria um novo usuário com o papel de administrador
  //é definido como 'ADMIN' por padrão e não pode ser acessado pela rota de registro
  @Post('admin')
  @UsePipes(ValidationPipe)
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createUser(createAdminDto, 'ADMIN');
  }

  @Get()
  getUsers() {return this.usersService.getUsers();}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User Not Found', 404);
    return user;
  }

  @Patch(':id')
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto,) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}