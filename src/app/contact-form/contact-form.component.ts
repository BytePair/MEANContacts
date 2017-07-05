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
        private route: ActivatedRoute,
        private router: Router
    ) { }


    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            // if passed an id, look up the contact
            const tempContact = this.contactService.tempGetContact(parseInt(id, 10));
            // do not edit the actual contact, will mess up contact list if user presses back
            this.contact = {
                _id: tempContact._id,
                name: tempContact.name,
                email: tempContact.email,
                mobile: tempContact.mobile,
                work: tempContact.work
            };
            console.log('found contact with id #' + id);
        } else {
            // otherwise use blank contact
            this.contact = this.CLEAN_CONTACT;
            console.log('using blank contact');
        }
    };


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
