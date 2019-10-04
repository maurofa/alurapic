import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { PhotoService } from '../../photo.service';
import { PhotoComment } from '../../photo/photo-comment';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(
    private photoService: PhotoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.fb.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  save() {
    const commentText = this.commentForm.get('comment').value as string;
    this.comments$ = this.photoService.addComment(this.photoId, commentText)
                          .pipe(
                            tap(() => this.commentForm.reset()),
                            switchMap(() => this.photoService.getComments(this.photoId))
                          );
  }
}
