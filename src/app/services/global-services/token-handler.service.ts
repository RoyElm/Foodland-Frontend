import { paths } from './../../../environments/paths.environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenHandlerService {

    public constructor(private router: Router, private authService: AuthService) { }

    //handling token expired
    public tokenSessionExpired(){
        this.authService.logout();
        this.router.navigateByUrl(paths.homeUrl);
    }

}

