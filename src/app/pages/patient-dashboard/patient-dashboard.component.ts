import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'patient-dashboard',
  templateUrl: 'patient-dashboard.component.html',
  styleUrls: ['patient-dashboard.component.css'],
})
export class PatientDashboard {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('PatientDashboard - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PatientDashboard - Deep Pills',
      },
    ])
  }
}
