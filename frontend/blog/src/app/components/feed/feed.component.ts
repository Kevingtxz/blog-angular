import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import Post from 'src/app/model/Post'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  newPost: Post = {
    id: 0,
    name: '',
    message: ''
  } as Post;
  listPost?: Post[]

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.findPosts()
  }

  private findPosts() {
    this.postService.getPosts().subscribe({
      next: (data: Post[]) => this.listPost = data,
      error: (err: Error) => console.log(err)
    })
  }

  createPost() {
    this.postService.postPosts(this.newPost).subscribe({
      next: (data: Post) => {
        this.newPost = data
        location.assign('/feed')
      },
      error: (err: Error) => console.log(err)
    })
  }
}
