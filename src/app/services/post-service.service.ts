import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Http,Headers } from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostServiceService {

  private headers = new Headers({'Content-Type': 'application/json'});

  posts: Post[] = [];
  authors: any;
  postSubject = new Subject<Post[]>();

    
  constructor(private httpClient: HttpClient, private http: Http) {
    this.getPosts();
   }

  emitPosts(){
    this.postSubject.next(this.posts);
  }

  loveIt(id: number, post: Post): void{
    this.posts[id].loveIts ++;
    this.updatePost(post.id, post.loveIts)
      .then(() => {
          this.emitPosts();
      });
  }

  noLoveIt(id: number, post: Post){
    this.posts[id].loveIts --;
    this.updatePost(post.id, post.loveIts)
      .then(() => {
          this.emitPosts();
      });
  }

  deletePost(post: Post): Promise<void>{
    const id = post.id;
    const url = `${'http://localhost:8000/articles/article'}/${id}`;
    //x this.posts.filter(x => x.id === post.id)
    const postIndex = this.posts.findIndex(
      (postEl) => {
        if(postEl === post){
          return true;
        }
      }
    );
    this.posts.splice(postIndex, 1);
    this.emitPosts();
    return this.http.delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
    
  }
 
  newPost(post: Post): Promise<Post>{
    console.log(JSON.stringify(post));
    return this.http
               .post('http://localhost:8000/articles', JSON.stringify(post), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Post) 
               .catch(this.handleError);
  }

  updatePost(id: number, lv: number, post ?: Post): Promise<Post>{
    console.log(JSON.stringify(post));
    const url = `${'http://localhost:8000/articles'}/${id}/${lv}`;
  return this.http
              .put(url, JSON.stringify(post), {headers: this.headers})
              .toPromise()
              .then(() => {console.log(JSON.stringify(post));})
              .catch(this.handleError);
  }

  getPosts(){
    this.http.get('http://localhost:8000/articles')
        .map( respo => respo.json())
         .subscribe(data =>{
            this.posts = data.posts;
            this.emitPosts();
          }, error => {
            console.log(error);
          });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  

}
