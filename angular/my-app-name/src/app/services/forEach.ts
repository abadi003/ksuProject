import { Injectable } from '@angular/core';

@Injectable()
export class ForEach {
  forEach(loop: Object[], target: Object[], attr: string[]) {
    console.log(loop)
    loop.forEach(function (data) {
      let temp: any = {};
      for (let i = 0; i < attr.length; ++i) {
        temp[attr[i]] = data[attr[i]];
      }
      target.push(temp);
    });
  }
}
