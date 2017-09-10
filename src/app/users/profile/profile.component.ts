import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private id: string;
  username: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  photo: string;
  constructor(private userService: UserService,
              private authService: AuthService,
              private http: Http,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.id = this.authService.getLoggedUserId();
    this.userService.getProfile(this.id)
      .map((res) => res.json())
      .subscribe((user: any) => {
        this.username = user.name;
        this.email = user.email;
        this.photo = user.photo;
        this.age = user.age;
        this.height = user.height;
        this.weight = user.weight;
        this.gender = user.gender === 'true' ? 'Male' : 'Female';
      });
  }
  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));
      this.http.post('/api/upload', formData).map((res: Response) => res.json()).subscribe(
        (success) => {
          alert(success._body);
        },
        (error) => alert(error));
    }
  }
  saveEditable(value) {
    // call to http service
    console.log(value);
  }

}
