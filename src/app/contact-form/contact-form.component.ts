import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { ContactService } from '../contact.service';
import { Contact } from '../contact';


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css'],
    providers: [ContactService]
})


export class ContactFormComponent implements OnInit {

    // variables for ContactFormComponent

    title = 'Contact Form';

    // TODO: Remove placeholder contact
    contact: Contact;
    CLEAN_CONTACT: Contact = {
        name: '',
        email: '',
        mobile: '',
        work: ''
    };


    // functions for ContactFormComponent

    constructor(
        private contactService: ContactService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        // if route has an id as a parameter, bring up the correct contact for editing
        // otherwise use a blank
        this.route.queryParams.subscribe(params => {
            console.log(params.id);
            if (params.id) {
                this.contact = this.contactService.tempGetContact(parseInt(params.id, 10));
            } else {
                this.contact = this.CLEAN_CONTACT;
            }
        })
    }

    saveContact(contact: Contact): void {

        // TODO: Save new/existing contact

        // if it has _id, update existing contact

        // if not, create a new one
        console.log('save', contact.name);
    };

    cancelContact(contact: Contact): void {
        this.location.back();
        console.log('cancel', contact.name);
    };

}
