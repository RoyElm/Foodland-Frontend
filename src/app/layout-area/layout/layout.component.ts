import { SocketIoService } from '../../services/global-services/socket-io.service';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    public constructor(private socketIoService: SocketIoService) { }

    public ngOnInit(): void {
        //check if user is login after refresh to connect socket-io;
        if (store.getState().authState.user?._id) {
            this.socketIoService.connect();
        }
    }

}
