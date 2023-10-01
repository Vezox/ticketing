import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController{
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  async getUser() {
      const user =  await this.userService.getUser("test");
      return user;
  }
}
