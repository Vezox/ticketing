import { Controller, Get } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.get')
  async getUser(data: string) {
    console.time("time");
    const user = await fetch('https://httpbin.org/get') //2s
    console.timeEnd("time");
    return user;
  }
}
