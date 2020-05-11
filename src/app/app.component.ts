import { Component } from '@angular/core';
import { ReceiptManagerService } from 'src/services/receipt-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cdcd';
  currentStat: string;
  constructor(private serialService: ReceiptManagerService) {
    this.currentStat = '미확정';
  }

  public writeText(text: string) {
    this.serialService.myPort.write(text);
    // this.serialService.writeText(text);
  }

  backfeeding() {
    this.serialService.myPort.write(this.serialService.Temp_BackFeeding);
    // this.serialService.writeBuffer(this.serialService.Temp_BackFeeding);
  }

  partialCut() {
    this.serialService.myPort.write(this.serialService.Temp_PartialCut);
    // this.serialService.writeBuffer(this.serialService.Temp_PartialCut);
  }

  fullCut() {
    this.serialService.myPort.write(this.serialService.Temp_FullCut);
    // this.serialService.writeBuffer(this.serialService.Temp_FullCut);
  }

  checkStatus() {
    this.currentStat = this.serialService.portStatusString;
  }

  openPort() {
    this.serialService.myPort.open();
    // this.serialService.openAsync();
  }

  closePort() {
    this.serialService.myPort.close();
    // this.serialService.close();
  }

  unassignPort() {
    this.serialService.removePort();
  }

  assignPort(portName: string) {
    this.serialService.assignPort(portName);
  }
}
