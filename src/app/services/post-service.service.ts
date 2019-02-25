import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class PostServiceService {

  posts: Post[] = [];
  authors: any;
  postSubject = new Subject<Post[]>();

    
  constructor(private httpClient: HttpClient, private http: Http) {
    this.getPosts();
   }

  emitPosts(){
    this.postSubject.next(this.posts);
  }

  loveIt(id: number){
    this.posts[id].loveIts ++;
    this.emitPosts();
  }

  noLoveIt(id: number){
    this.posts[id].loveIts --;
    this.emitPosts();
  }

  deletePost(post: Post){
    /*const postIndex = this.posts.findIndex(
      (postEl) => {
        if(postEl === post){
          return true;
        }
      }
    );
    this.posts.splice(postIndex, 1);
    this.savePosts();*/
    this.emitPosts();
  }

  newPost(post: Post){
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
  }

  savePosts(){
    /*this.httpClient
    .put('https://blog-pos.firebaseio.com/posts.json', this.posts)
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur : '+error);
      }
    );*/
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

    /*this.httpClient
    .get<any[]>('https://blog-pos.firebaseio.com/posts.json')
    .subscribe(
      (response) => {
        this.posts = response;
        this.emitPosts();
      },
      (error) => {
        console.log('Erreur : '+error);
      }
    );*/
  }

}
