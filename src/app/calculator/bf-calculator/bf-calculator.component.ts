import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';

@Component({
  selector: 'app-bf-calculator',
  templateUrl: './bf-calculator.component.html',
  styleUrls: ['./bf-calculator.component.css']
})
export class BfCalculatorComponent implements OnInit {
  title = 'Body Fat Calculator';
  inProgress = false;
  result = '0%';

  constructor() {
  }

  ngOnInit() {

  }

  onBfResult(res: string) {
    // console.log('Result: ' + res);
    this.result = res;
    this.inProgress = false;
  }

  onProgress(res: boolean) {
    // console.log('Result: ' + res);
    this.inProgress = res;
  }
}

@Pipe({name: 'changeMetrics'})
export class ChangeMetrics implements PipeTransform {
  transform(value: string): string {
    const newStr: string = value + ' (cm)';
    return newStr;
  }
}

@Pipe({name: 'changeUS'})
export class ChangeUS implements PipeTransform {
  transform(value: string): string {
    const newStr: string = value + ' (feet inches)';
    return newStr;
  }
}

export enum Units {
  Metrics = 0,
  US = 1,
  Other = 2
}