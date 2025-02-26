import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key)
    }
    return null;
  }

  removeItem(key:string){
    if(isPlatformBrowser(this.platformId)){
      return localStorage.removeItem(key)
    }
    return null;
  }

  clear(){
    localStorage.clear()
  }
}
