import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = "";
  public boxmessageColor: string = '';
  public srcImageLog: string = '';
  constructor(private router: Router) { }

  callMsg(message: string, color: string, srcImage: string) {
    this.message = message;
    this.boxmessageColor = color;
    this.srcImageLog = srcImage;
/*
      setInterval(() => {
        this.close();
      }, 4000)
*/
  }
  close() {
    this.message = "";
  }

}
