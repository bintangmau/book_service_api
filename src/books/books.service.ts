import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class BooksService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  async find(keyword: string) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}`;
    let axios = await this.httpService.axiosRef({
      method: "GET",
      url
    });
    let response = axios.data;
    let result = [];
    for(let book of response.items) {
      result.push({
        id: book.id,
        title: book.volumeInfo.title,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        author: "Untitled",
        rating: this.rating()
      });
    }
    return { 
      data: result
    };
  }

  async createWhitelist(data: any) {
    return await this.cacheManager.set("whitelist_books", JSON.stringify(data), { ttl: 3600});
  }

  async getWhiteList() {
    let result = JSON.parse(await this.cacheManager.get("whitelist_books"));
    if(result) return result;
    return [];
  }

  private rating() {
    return Math.floor(Math.random() * (5 - 3) + 3);
  }

}
