import { Component, OnInit } from '@angular/core';

import * as  $ from 'jquery';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    mouseEnter(event) {
        $(event.target).addClass('social-media-link-hover');
    }

    mouseLeave(event) {
        $(event.target).removeClass('social-media-link-hover');
    }

}
