import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { FirstCharComponent } from './first-char/first-char.component';
import { RemoveSpecialCharPipe } from './pipe/remove-special-char.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [UserDetailsComponent, FirstCharComponent],
  exports: [UserDetailsComponent, FirstCharComponent]
})
export class SharedModule { }
