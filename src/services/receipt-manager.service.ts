import { Injectable } from '@angular/core';
import SerialPort from 'serialport';
import { } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ReceiptManagerService {

  private myPort: SerialPort;
  public currentPorts;
  constructor() { 
    let serialport = window['require']('serialport');
    let app = window['require']('electron').remote;
    console.log(serialport, app, window['process']);
  }
}