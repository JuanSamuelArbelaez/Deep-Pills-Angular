import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'patient-dashboard',
  templateUrl: 'patient-dashboard.component.html',
  styleUrls: ['patient-dashboard.component.css'],
})
export class PatientDashboard {
  activeTab: string;
  
  constructor(private title: Title, private meta: Meta, private route: ActivatedRoute) {
    this.title.setTitle('PatientDashboard - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PatientDashboard - Deep Pills',
      },
    ])
    this.route.url.subscribe((segments) => {
      this.activeTab = segments[1]?.path; // Obtén la pestaña activa de la URL
    });
  }

  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
