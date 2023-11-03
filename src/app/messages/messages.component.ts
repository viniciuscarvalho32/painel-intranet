import { Component, Input, Output } from '@angular/core';
import { Response } from '../Response';
import { MessagesService } from '../messages.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  boxmessageColor: string = '';
  constructor(public messagesService: MessagesService) { }

    onInit() {
      //this.boxmessageColor = this.messagesService.boxmessageColor;
      //console.log("boxMsg color: " + this.boxmessageColor);
    }
 }
