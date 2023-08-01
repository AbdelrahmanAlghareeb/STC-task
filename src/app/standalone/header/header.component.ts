import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatListModule} from '@angular/material/list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf, NgFor, AsyncPipe} from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserDTO } from 'src/app/core/models/user-dto';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    RouterModule,
    AsyncPipe,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  userData!: UserDTO | null


  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {
    authService.userData$.subscribe(res=>{
      debugger
      this.userData = res
    })
  }
  logout(){
    this.authService.logout()
  }
}
