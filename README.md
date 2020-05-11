# Angular-Electron-SerialPort_ThermalPrinterExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

## Current Problems

 - port.open not works at once most times, must try to open 2 times, then it opens with exception(caught by drain)
 - after open, port.write works around 20 times, then it stopped to work. every ignored commands will be executed after close, and open again.
