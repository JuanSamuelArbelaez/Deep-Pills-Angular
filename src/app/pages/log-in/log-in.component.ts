import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
})
export class LogIn {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Log In - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Log In - Deep Pills',
      },
    ])
  }
}
