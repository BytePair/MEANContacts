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

    contact: Contact;
    CLEAN_CONTACT: Contact = {
        name: '',
        email: '',
        phone: {
            mobile: '',
            work: ''
        }
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
            this.contactService.getContact(id)
                .then(response => this.contact = response)
                .catch(error => console.log(error));
        } else {
            // otherwise use blank contact
            this.contact = this.CLEAN_CONTACT;
        }
    };


    saveContact(contact: Contact): void {
        if (!contact._id) {
            this.contactService.createContact(contact)
                .catch(error => console.error(error))
                .then(() => this.router.navigate(['/']));
        } else {
            this.contactService.updateContact(contact)
                .catch(error => console.error(error))
                .then(() => this.router.navigate(['/']));
        }
    };


    cancelContact(): void {
        this.location.back();
    };

}
