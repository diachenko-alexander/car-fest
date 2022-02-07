import { Component, OnInit } from '@angular/core';
import {visibility} from '../../../spa/services/animations';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.css'],
  animations: [visibility]
})
export class ImagePanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
