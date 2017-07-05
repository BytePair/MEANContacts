import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Contact } from './contact';

import 'rxjs/add/operator/toPromise';



// TODO: replace array of placeholder contacts
const CONTACTS: Contact[] = [
    { _id: '0', name: 'name one', email: 'email1@email.com', mobile: '1231231234', work: '1231231234'},
    { _id: '1', name: 'name two', email: 'email2@email.com', mobile: '1231231234', work: '1231231234'},
    { _id: '2', name: 'name three', email: 'email3@email.com', mobile: '1231231234', work: '1231231234'},
    { _id: '3', name: 'name four', email: 'email4@email.com', mobile: '1231231234', work: '1231231234'},
    { _id: '4', name: 'name five', email: 'email5@email.com', mobile: '1231231234', work: '1231231234'},
];

@Injectable()
export class ContactService {

    // variables for ContactService

    // base url for all contacts api calls
    private contactsURL = '/api/contacts';


    // functions for ContactService

    constructor(private http: Http) { }


    // TODO: Return all contacts
    tempGetContacts(): Contact[] {
        return CONTACTS;
    }
    // Find all contacts - get("/api/contacts")
    getContacts(): Promise<Contact[]> {
        return this.http.get(this.contactsURL)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }


    // TODO: Add new contact
    // Create new contact - post("/api/contacts")
    createContact(newContact: Contact): Promise<Contact> {
        return this.http.post(this.contactsURL, newContact)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }


    // TODO: Get contact by ID
    tempGetContact(pos: number): Contact {
        return CONTACTS[pos];
    }
    // Get contact by ID - get("/api/contacts/:id")
    getContact(getContactId: string): Promise<Contact> {
        const getURL = this.contactsURL + '/' + getContactId;
        return this.http.get(getURL)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }


    // TODO: Update contact by ID
    // Update contact by ID - put("/api/contacts/:id")
    updateContact(putContact: Contact): Promise<Contact> {
        const putURL = this.contactsURL + '/' + putContact._id;
        return this.http.put(putURL, putContact)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }


    // TODO: Delete contact by ID
    // Delete contact by ID - delete("/api/contacts/:id")
    deleteContact(delContactId: String): Promise<String> {
        return this.http.delete(this.contactsURL + '/' + delContactId)
            .toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }


    // handles errors for any ContactService functions
    private handleError (error: any) {
        const errMsg = (error.message)
                            ? error.message
                            : error.status
                                ? `${error.status} - ${error.statusText}`
                                : 'Server error';
        // log to console instead
        console.error(errMsg);
    }


}
