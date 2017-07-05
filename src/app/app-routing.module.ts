import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


// The Routing Module pulls the routes into a variable.
// The variable clarifies the routing module pattern in case you export the module in the future.
const routes: Routes = [
    { path: '#', redirectTo: '', pathMatch: 'full' },
    { path: '',  component: ContactListComponent },
    { path: 'add', component: ContactFormComponent },
    { path: 'edit', component: ContactFormComponent }
];


@NgModule({
    // The Routing Module adds RouterModule.forRoot(routes) to imports
    imports: [ RouterModule.forRoot(routes) ],
    // The Routing Module adds RouterModule to exports so that the components in the companion module
    // have access to Router declarables, such as RouterLink and RouterOutlet
    exports: [ RouterModule ]
})


export class AppRoutingModule {}
