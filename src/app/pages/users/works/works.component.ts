import { Component, OnInit } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent implements OnInit {

    constructor(){

    }
ngOnInit(): void {
  Aos.refresh();
}

}
