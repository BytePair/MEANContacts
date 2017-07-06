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
    modalContact: Contact;


    // functions for ContactListComponent

    constructor(
        private contactService: ContactService,
        private router: Router
    ) { }


    // get full list of contacts when contact list loads
    ngOnInit() {
        this.refreshContacts();
    }

    // refresh contact list when loading page or deleting contact
    refreshContacts() {
        this.contactService.getContacts()
            .then(response => this.contacts = response)
            .catch(error => console.error(error));
    }

    // sets the selected contact and shows the modal
    onSelect(contact: Contact): void {
        this.selectedContact = contact;
    }


    // remove selected class
    resetSelected(): void {
        this.selectedContact = null;
    }


    // go to clean contact form page
    newContact(): void {
        this.router.navigate(['/add'])
            .catch(e => console.error('Error:', e));
    }


    // go to contact form w/ details filled out
    editContact(id: string): void {
        this.router.navigate(['/edit', id])
            .catch(e => console.error('Error:', e));
    }


    // delete contact with the specified id, and refresh the list
    deleteContact(id: string): void {
        this.contactService.deleteContact(id)
            .then(() => this.refreshContacts())
            .catch(error => console.error(error));
    }


    // enable list item clicking
    enablePointer(event) {
    }


    // disable list item clicking
    disablePointer(event) {
    }


}
