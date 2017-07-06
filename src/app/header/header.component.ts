import { Component, OnInit } from '@angular/core';

import * as  $ from 'jquery';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    mouseEnter(event) {
        $(event.target).addClass('nav-link-hover');
    }

    mouseLeave(event) {
        $(event.target).removeClass('nav-link-hover');
    }
}


// resize header when scrolling down page
$(function() {

    document.addEventListener('scroll', function() {

        // distance to top of page used for both features
        const scrollPosition = $(document).scrollTop();

        // shrink the header
        if (scrollPosition > 200) {
            $('#main-navbar').addClass('shrink-navbar');
            $('.navbar-brand').addClass('shrink-navbar-brand');
        } else {
            $('#main-navbar').removeClass('shrink-navbar');
            $('.navbar-brand').removeClass('shrink-navbar-brand');
        }
    });

});

