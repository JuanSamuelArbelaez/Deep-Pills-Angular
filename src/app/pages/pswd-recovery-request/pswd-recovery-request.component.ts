import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'pswd-recovery-request',
  templateUrl: 'pswd-recovery-request.component.html',
  styleUrls: ['pswd-recovery-request.component.css'],
})
export class PswdRecoveryRequest {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('PswdRecoveryRequest - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PswdRecoveryRequest - Deep Pills',
      },
    ])
  }
}
