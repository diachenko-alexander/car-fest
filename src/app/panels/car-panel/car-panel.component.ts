import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../services/car-interface';
import {visibility} from '../../../spa/services/animations';

@Component({
  selector: 'app-car-panel',
  templateUrl: './car-panel.component.html',
  styleUrls: ['./car-panel.component.css'],
  animations: [visibility]
})
export class CarPanelComponent implements OnInit {

  @Input() car!: Car;
  @Input() index = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
