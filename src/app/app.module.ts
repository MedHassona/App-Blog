import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, HttpModule} from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts/posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostServiceService } from './services/post-service.service';
import { UpDownPipe } from './pipes/upDown.pipe';
 
const appRoutes: Routes = [
  {path: 'posts',component: PostsComponent},
  {path: 'posts/new', component: NewPostComponent},
  {path: '', component: PostsComponent}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    NewPostComponent,
    UpDownPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), 
    HttpModule,
  ],
  providers: [
    PostServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
