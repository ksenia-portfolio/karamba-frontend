import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamesstore-angular';
}
