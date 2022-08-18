import { CacheModule, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    CacheModule.register()
  ],
  providers: [BooksService],
  controllers: [BooksController]
})
export class BooksModule {}
