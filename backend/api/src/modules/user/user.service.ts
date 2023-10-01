import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.userClient.subscribeToResponseOf('user.get');
    await this.userClient.connect();
  }

  async getUser(id: string) {
    try {
      console.time('time');
      const user = await firstValueFrom(
        this.userClient.send('user.get', 'test nha'),
      );
      console.timeEnd('time');
      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
