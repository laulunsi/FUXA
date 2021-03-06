import { Component, OnInit, Input } from '@angular/core';
import { GaugeBaseComponent } from '../../gauge-base/gauge-base.component'
import { GaugeSettings, Variable, WindowLink } from '../../../_models/hmi';

@Component({
  selector: 'gauge-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css']
})
export class MotorComponent extends GaugeBaseComponent implements OnInit {

  @Input() data: any;

  static TypeTag = 'svg-ext-motor';
  static LabelTag = 'Motor';

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.data) {
    }
  }

  static getSignals(pro: any) {
    let res: string[] = [];
    if (pro.variableId) {
      res.push(pro.variableId);
    }
    if (pro.alarmId) {
      res.push(pro.alarmId);
    }
    return res;
  }

  static processValue(ga: GaugeSettings, svgele: any, sig: Variable) {
    if (svgele.node && svgele.node.children && svgele.node.children.length >= 1) {
      for (let x = 0; x < svgele.node.children.length; x++) {
        let g = svgele.node.children[x];
        if (g.id.startsWith("c")) {
          let clr = '';
          let val = parseInt(sig.value, 10);
          if (ga.property && ga.property.ranges) {
            for (let idx = 0; idx < ga.property.ranges.length; idx++) {
              if (ga.property.ranges[idx].min <= val && ga.property.ranges[idx].max >= val) {
                clr = ga.property.ranges[idx].color;
              }
            }
            g.setAttribute('fill', clr);
          }
        }
      }
    }
  }
}
