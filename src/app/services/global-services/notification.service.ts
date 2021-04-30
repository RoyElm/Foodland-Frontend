import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { ErrorsService } from './errors.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private myNotyf = new Notyf({ duration: 4000, ripple: true, position: { x: "left", y: "bottom" } });

    public constructor(private myErrorsService: ErrorsService) { }

    public success(message: string): void {
        this.myNotyf.success(message);
    }

    public error(err: any): void {
        this.myNotyf.error(this.myErrorsService.getError(err));
    }
}
