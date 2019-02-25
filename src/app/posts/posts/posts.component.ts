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

  lovedIt(i: number){
    this.postService.loveIt(i);
  }

  nlovedIt(i: number){
    this.postService.noLoveIt(i);
  }

  delete(post: Post){
    this.postService.deletePost(post);
  }


  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
