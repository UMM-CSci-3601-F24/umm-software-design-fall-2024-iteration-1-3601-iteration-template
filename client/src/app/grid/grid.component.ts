import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

import { GridCellComponent } from '../grid-cell/grid-cell.component';


@Component({
  selector: 'app-grid-component',
  templateUrl: 'grid.component.html',
  styleUrls: ['./grid.component.scss'],
  standalone: true,
  providers: [],
  imports: [
    AsyncPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    CommonModule,
    GridCellComponent
  ],
})
export class GridComponent {

  n: number = 10;
  nInput: number;
  gridRows: number[];
  gridColumns: number[];

  constructor() {
    this.gridRows = Array.from({ length: this.n }, (_, index) => index);
    this.gridColumns = Array.from({ length: this.n }, (_, index) => index);
  }

  onSizeInput(nInput: number) {
    console.log(this.n);
      this.n = nInput;
    console.log(this.n);
    this.gridRows = Array.from({ length: this.n }, (_, index) => index);
    this.gridColumns = Array.from({ length: this.n }, (_, index) => index);

  }


}
