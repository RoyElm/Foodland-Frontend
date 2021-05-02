import { CredentialsModel } from '../../models/auth-models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../../models/auth-models/auth.model';
import { environment } from 'src/environments/environment';
import store from '../../redux/store';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from '../../redux/auth-state';
import { FormGroup } from '@angular/forms';
import { SocketIoService } from './socket-io.service';
import { resetCartItemsAction } from 'src/app/redux/cart-items-state';
import { resetShoppingCartAction } from 'src/app/redux/shopping-cart-state';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public constructor(private httpClient: HttpClient, private socketIoService: SocketIoService) { }

    //handling register
    public async registerAsync(user: AuthModel): Promise<AuthModel> {
        const registeredUser = await this.httpClient.post<AuthModel>(environment.registerUrl, user).toPromise();
        store.dispatch(userRegisteredAction(registeredUser));

        //Start listen to socket.io
        this.socketIoService.connect();
        return registeredUser;
    }

    //handling login
    public async loginAsync(credentials: CredentialsModel): Promise<AuthModel> {
        const loggedInUser = await this.httpClient.post<AuthModel>(environment.loginUrl, credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        
        //Start listen to socket.io
        this.socketIoService.connect();
        return loggedInUser;
    }

    //check if user id exist in the Database
    public checkByUserIdAsync = async (firstFormGroup: FormGroup): Promise<boolean> => {
        const existUser = await this.httpClient.post<object[]>(environment.confirmEmailOrIdUrl + "idCard", firstFormGroup.value).toPromise();
        if (existUser.length >= 1) return false;
        return true;
    }

    //check if email exist in the Database
    public checkByEmailAsync = async (firstFormGroup: FormGroup): Promise<boolean> => {
        const existUser = await this.httpClient.post<object[]>(environment.confirmEmailOrIdUrl + "email", firstFormGroup.value).toPromise();
        if (existUser.length >= 1) return false;
        return true;
    }

    //handling logout.
    public logout(): void {
        store.dispatch(resetCartItemsAction());
        store.dispatch(resetShoppingCartAction());
        store.dispatch(userLoggedOutAction());
        this.socketIoService.disconnect();
    }
}

