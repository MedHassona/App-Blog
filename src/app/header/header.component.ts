import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  newP: boolean;
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {}
    
  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
