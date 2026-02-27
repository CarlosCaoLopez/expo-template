// SPDX-License-Identifier: AGPL-3.0-or-later
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Register a shutdown hook that closes the Nest app when Prisma emits 'beforeExit'.
  // Use a narrow cast to avoid `any` and unsafe-call lint errors.
  enableShutdownHooks(app: INestApplication) {
    type PrismaOn = { $on(event: 'beforeExit', callback: () => Promise<void>): void };
    (this as unknown as PrismaOn).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
