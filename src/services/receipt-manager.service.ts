import { Injectable } from '@angular/core';
import SerialPortType from 'serialport';
import { } from 'electron';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ReceiptManagerService {

  private SerialPort: typeof SerialPortType;
  myPort: SerialPortType;
  public currentPorts;

  Temp_FullCut = Buffer.from([0x1B, 0x69, 0x00]);
  Temp_PartialCut = Buffer.from([0x1B, 0x6D, 0x00]);
  Temp_BackFeeding = Buffer.from([0x1B, 0x4A, 0x7F, 0x00]);
  Data_Check = Buffer.from([0x10, 0x04, 0x02]);
  Data_AutoCheck = Buffer.from([0x1D, 0x61, 0x01]);
  Data_AutoOffline = Buffer.from([0x1A, 0x70, 0x00]);
  Data_PrintSpeed = Buffer.from([0x1A, 0x73, 0x0a]);
  Data_Concentration = Buffer.from([0x1D, 0x28, 0x4B, 0x02, 0x00, 0x31, 0x02, 0x00]);
  Data_Rotate = Buffer.from([0x1B, 0x7B, 0x01]);
  Temp_Font = Buffer.from([0x1B, 0x4D, 0x00, 0x00]);
  Temp_Language = Buffer.from([0x1B, 0x52, 0x0d, 0x00]);
  Temp_Leftmargin = Buffer.from([0x1D, 0x4C, 0x00, 0x00, 0x00]);
  Temp_Order = Buffer.from([0x1B, 0x61, 0x00, 0x00]);

  constructor() {
    this.SerialPort = window['require']('serialport');
    console.log(this.SerialPort);

  }

  get portStatusString(): string {
    let base = '';
    if (!this.myPort) {
      return '현재 포트 없음';
    }
    if (this.myPort.isOpen) {
      base += '열려있음';
    }
    else {
      base += '닫혀있음';
    }

    if (this.myPort.isPaused) {
      base += ', 일시정지중';
    }

    return base;
  }

  public assignPort(portName: string) {
    this.myPort = new this.SerialPort('COM3', {
      autoOpen: false,
      baudRate: 19200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none'
    }, (err) => {
      console.log('serial initialize error ', err);
    });
    this.myPort.setDefaultEncoding('ASCII');
    console.log(this.myPort);
    this.myPort.drain((err) => {
      console.log('write any error', err);
    });
  }

  public removePort() {
    this.myPort.removeAllListeners();
    this.myPort = null;
  }

  public async testPrint(text: string) {
    this.connect();
    console.log('finish connect');
    this.init();
    console.log('finish init');
    this.writeText(text);
    console.log('finish writeText');
    this.cut(2);
    console.log('finish Cut');
    this.close();
    console.log('finish close');
  }

  public async testPrint2() {
    console.log('start test print', this.myPort);
    this.myPort.on('open', (err0) => {
      this.myPort.write('dadsadasdsadsajdkasieihjhei1h321hhedu021u3wid13e92231235225274d3asd21j3l123', (err) => {
        this.myPort.write(this.Temp_BackFeeding, (err2) => {
          this.myPort.write(this.Temp_PartialCut, (err3) => {
            this.myPort.close((err4) => {
              console.log('finish');
            });
          });
        });
      });
    });
    this.myPort.open();
    // setTimeout(() => {
    //   this.myPort.open(function(err){
    //     this.myPort.write( "dadsadasdsadsajdkasieihjhei1h321hhedu021u3wid13e92231235225274d3asd21j3l123",(err)=>{
    //       this.myPort.write(this.Temp_BackFeeding,(err)=>{
    //         this.myPort.write(this.Temp_PartialCut,(err)=>{
    //           this.myPort.close((err)=>{
    //             console.log('finish');
    //           });
    //         });
    //       })
    //     });
    //   });
    // }, 2000);
    // let text = "dadsadasdsadsajdkasieihjhei1h321hhedu021u3wid13e92231235225274d3asd21j3l123";
    // // this.open2();
    // await this.openAsync();
    // this.myPort.write(text);
    // this.myPort.close();
  }


  public open2() {
    try {
      this.myPort.open((err) => {
        console.log('open succeed');
        setTimeout(() => {
          console.log('opensettimeout succeed');
        }, 1000);
      });
      console.log('open start');
    } catch {
      console.log('open catch');
    }
  }

  public async openAsync() {
    const promise = new Promise<boolean>((resolve, reject) => {
      try {
        this.myPort.open((err) => {
          console.log('open succeed');
          resolve(true);
        });
        console.log('open start');
      } catch {
        console.log('open catch');
        resolve(false);
      }
    });
    await promise;
    console.log('open complete');
  }

  public async connect() {
    // console.log('assigning promise...');
    // if(this.myPort.isOpen){
    //   let promise1=new Promise((resolve, reject)=>{
    //     try{
    //       console.log('connect chap1start');
    //       this.myPort.close((err)=>{
    //         console.log('connect chap1succeed');
    //         resolve(true);
    //       });
    //     }catch {
    //       console.log('connect chap1catch');
    //       resolve(false);
    //     }
    //   })
    //   await promise1;
    //   console.log('connect chap1complete');
    // }
    // else{
    //   console.log('port already open. skip close part of connect');
    // }
    if (!this.myPort.isOpen) {
      console.log('assigning promise...');
      const promise2 = new Promise((resolve, reject) => {
        try {
          console.log('connect chap2start');
          this.myPort.open((err) => {
            console.log('connect chap2succeed');
            resolve(true);
          });
        } catch {
          console.log('connect chap2catch');
          resolve(false);
        }
      });
      await promise2;
      console.log('connect chap2complete');
    }
    else {
      console.log('port already open. skip open part of connect');
    }
  }

  public async close() {
    if (this.myPort.isOpen) {
      console.log('assigning promise...');
      const promise2 = new Promise((resolve, reject) => {
        try {
          console.log('close start');
          this.myPort.open((err) => {
            console.log('close succeed');
            resolve(true);
          });
        } catch {
          console.log('close catch');
          resolve(false);
        }
      });
      await promise2;
      console.log('close complete');
    }
    else {
      console.log('port not open. skip close part of close');
    }
  }

  public async init() {

    await this.writeBuffer(this.Data_AutoCheck);
    await this.writeBuffer(this.Data_AutoOffline);
    await this.writeBuffer(this.Data_PrintSpeed);
    await this.writeBuffer(this.Data_Concentration);

  }

  public writeText(text: string) {
    console.log('start write: ' + text);
    console.log('assigning promise...');
    const promise = new Promise((resolve, reject) => {
      console.log('in promise', text);
      this.myPort.write(text, (err) => {
        console.log('in callback', text);
        if (err) {
          resolve(false);
          console.log('Error on write: ', err.message);
        }
        resolve(true);
        console.log('message written');
      });
      console.log('finish throw callback');
    });
    return promise;
  }

  public async cut(mode: number) {
    await this.writeBuffer(this.Temp_BackFeeding);
    if (mode === 1) {
      await this.writeBuffer(this.Temp_FullCut);
    }
    else if (mode === 2) {
      await this.writeBuffer(this.Temp_PartialCut);
    }
  }

  public async writeBuffer(buf: Buffer) {
    console.log('now write', buf);
    console.log('assigning promise...');
    const promise = new Promise((resolve, reject) => {
      console.log('in promise', buf);
      this.myPort.write(buf, (err) => {
        console.log('in callback', buf);
        if (err) {
          resolve(false);
          console.log('Error on write: ', err.message);
        }
        resolve(true);
        console.log('message written');
      });
      console.log('finish throw callback');
    });
    return promise;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
