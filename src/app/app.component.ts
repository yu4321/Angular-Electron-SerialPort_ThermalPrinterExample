import { Component } from '@angular/core';
import { ReceiptManagerService } from 'src/services/receipt-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cdcd';
  constructor(private serialService : ReceiptManagerService){

  }
}
