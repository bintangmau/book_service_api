import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

  constructor(
    private readonly booksService: BooksService
  ) {}

  @Get()
  async find(@Query('keyword') keyword: string) {
    return await this.booksService.find(keyword);
  }

  @Post('whitelist')
  async createWhitelist(@Body() data: any) {
    return await this.booksService.createWhitelist(data);
  }

  @Get('whitelist')
  async getWhiteList() {
    return await this.booksService.getWhiteList();
  }

}
