import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  private divRepeat: number[]; // Temp: For repeating list-group-item

  constructor() {
    this.divRepeat = [0,1,2,3,4,5]; // Temp: For repeating list-group-item
  }

  ngOnInit() {
    $('input[type="checkbox"]').change(function (e) {
      if ($(this).is(':checked')) {
        $(this).closest('.list-group-item').addClass('active');
      } else {
        $(this).closest('.list-group-item').removeClass('active');
      }
    });

    // Row navigation to contents/details page
    $('.list-group-item').click(function(e){
      const target = e.target;
      // check if clicked element is a div, and not <a>, button or input
      if ($(target).is('div')) {
        // window.location = $(this).data("link");
      }
    });
  }

}
