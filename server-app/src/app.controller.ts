import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('ping')
  getPing(): string {
    try {
      this.logger.log('✅ /ping endpoint hit');
      // throw new Error('Simulated backend issue');
      return 'Pong from NestJS Server!';
    } catch (err) {
      this.logger.error('❌ Error in /ping endpoint', err.stack);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
