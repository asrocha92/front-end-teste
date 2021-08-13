import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectedLink(event:any, rota: string) {
    $('.tl').removeClass('active');
    $(event.target).addClass('active');
    this.router.navigate(["/dashbord/"+rota]);
  }

}
