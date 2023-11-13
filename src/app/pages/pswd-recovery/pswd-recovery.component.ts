import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'pswd-recovery',
  templateUrl: 'pswd-recovery.component.html',
  styleUrls: ['pswd-recovery.component.css'],
})
export class PswdRecovery {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('PswdRecovery - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PswdRecovery - Deep Pills',
      },
    ])
  }
}
