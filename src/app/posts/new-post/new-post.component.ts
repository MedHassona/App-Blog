import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PostServiceService } from '../../services/post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postService: PostServiceService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      title:['',Validators.required],
      //mymail:['',Validators.pattern('^([a-zA-Z0-9_\-\.])@([a-zA-Z0-9_\-\.])\.([a-zA-Z]{2,5})')],
      content:['', Validators.required]
    });
  }



  onSavePost(){
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    //const mymail = this.postForm.get('mymail').value;
    this.postService.newPost(new Post(title, content));
    this.router.navigate(['/posts']);
  }

}
