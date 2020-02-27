import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
],
declarations: [
    SidenavComponent
],
exports: [
    SidenavComponent
]
})
export class SharedModule {}