import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verification-success',
  imports: [RouterLink],
  templateUrl: './verification-success.component.html',
  styleUrl: './verification-success.component.scss'
})
export class VerificationSuccessComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(['/login']);
    }
    try {
      const decodedToken = JSON.parse(atob(token!.split('.')[1]));
      
      if (decodedToken.verificado) {
      } else {
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      this.router.navigate(['/auth/login']);
    }
  }
}
