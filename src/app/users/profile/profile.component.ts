import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.id = this.authService.getLoggedUserId();
    this.userService.getProfile(this.id)
      .map((res) => res.json())
      .subscribe((user: any) => {
        this.username = user.name;
        this.email = user.email;
        this.age = user.age;
        this.height = user.height;
        this.weight = user.weight;
        this.gender = user.gender === 'true' ? 'Male' : 'Female';
      });
  }

  saveEditable(value) {
    // call to http service
    console.log(value);
  }

}
