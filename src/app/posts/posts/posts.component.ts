import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostServiceService } from '../../services/post-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostServiceService, private http: Http) {
    
   }

  ngOnInit() {
    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  lovedIt(i: number, post: Post){
    this.postService.loveIt(i, post);
  }

  nlovedIt(i: number, post: Post){
    this.postService.noLoveIt(i, post);
  }

  delete(post: Post): void{
    this.postService.deletePost(post)
        .then(() => {
          this.posts = this.postService.posts;
        });
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
