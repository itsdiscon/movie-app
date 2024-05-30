import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Contact Form Submitted', this.contactForm);
    // Aquí podrías agregar lógica para enviar el formulario a un servidor
    alert('Message sent successfully!');
  }
}
