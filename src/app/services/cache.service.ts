import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  cache: Map<string, any> = new Map();

  put(url: string, res: any) {
    this.cache.set(url, res)
  }

  get(url: string) {
    return this.cache.get(url)
  }
}
