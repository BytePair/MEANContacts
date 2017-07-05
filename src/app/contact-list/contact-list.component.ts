import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../contact.service';
import { Contact } from '../contact';


@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
    providers: [ContactService]
})


export class ContactListComponent implements OnInit {


    // variables for ContactListComponent

    title = 'Contacts';
    contacts: Contact[];
    selectedContact: Contact;


    // functions for ContactListComponent

    constructor(
        private contactService: ContactService,
        private router: Router
    ) { }

    ngOnInit() {
        this.contacts = this.contactService.tempGetContacts();
    }

    onSelect(contact: Contact): void {
        console.log('selected', contact.name);
        this.selectedContact = contact;
    };

    // go to clean contact form page
    newContact(): void {
        this.router.navigate(['/add']);
    }

    editContact(contact: Contact): void {
        // TODO: implement edit contact button
        this.router.navigate(['/edit'], { queryParams: { id: contact._id}});
        console.log('edit', contact.name);
    };

    deleteContact(contact: Contact): void {
        // TODO: implement delete contact button
        console.log('delete', contact.name);
    };
}
