import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Contact } from './contact';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ContactService {


    // variables for ContactService

    // base url for all contacts api calls
    private contactsURL = '/api/contacts';

    public workingContact: Contact;


    // functions for ContactService

    constructor(
        private http: Http
    ) { }


    // Find all contacts - get("/api/contacts")
    getContacts(): Promise<Contact[]> {
        return this.http.get(this.contactsURL)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }


    // Create new contact - post("/api/contacts")
    createContact(newContact: Contact): Promise<Contact> {
        return this.http.post(this.contactsURL, newContact)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }


    // Get contact by ID - get("/api/contacts/:id")
    getContact(getContactId: string): Promise<Contact> {
        const getURL = this.contactsURL + '/' + getContactId;
        return this.http.get(getURL)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }


    // Update contact by ID - put("/api/contacts/:id")
    updateContact(putContact: Contact): Promise<Contact> {
        const putURL = this.contactsURL + '/' + putContact._id;
        return this.http.put(putURL, putContact)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }


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
