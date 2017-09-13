import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 members;

  constructor(
    // private memberService: MemberService
  ) {}
//   getAllmember()
//   {
//     this.memberService.getAllmember().subscribe(data=>{
// this.members=data.members;
//     });
//   }
  ngOnInit() {
   // this.getAllmember();
  }
}
