
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  numPages:number=0;
  loading: boolean = false;
  constructor(private http: HttpClient, private el: ElementRef,) { }

  ngOnInit(): void {
    this.getNumPage()
  }
 getNumPage(){
  this.http.get<number>(`http://localhost:5000/api/pages`).subscribe(numPages => {
    this.numPages=numPages;
    this.loadPosts();

  })
 }
  loadPosts() {
    this.http.get<any[]>(`http://localhost:5000/api/posts?page=${this.currentPage$.value}`).subscribe(posts => {
      if (posts && posts.length > 0) {
        if (this.currentPage$.value === 1) {
          this.posts$.next(posts);
        } else {
          const currentPosts = this.posts$.value;
          this.posts$.next([...currentPosts, ...posts]);
        }
      }      

    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {

    if (this.currentPage$.value < this.numPages && !this.loading)
    {
      this.loading = true;
      this.currentPage$.next(this.currentPage$.value + 1);
      this.loadPosts();
      this.loading = false;
    }

  }
}
