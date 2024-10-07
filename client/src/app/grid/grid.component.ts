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
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GridCell } from '../grid-cell/grid-cell';
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
    GridCellComponent,
    MatGridListModule,
  ],
})
export class GridComponent {

  n: number = 10;
  nInput: number;
  grid: GridCell[][] = [];
  currentRow: number = 0;
  currentCol: number = 0;
  rowIndex: number = 0;
  colIndex: number = 0;


  constructor() {
    this.initializeGrid();
  }

  // defaultGridCell(): GridCell {
  //   return {
  //     editable: true,
  //     value: '',
  //     edges: { top: false, right: false, bottom: false, left: false },
  //   };
  // }

  onSizeInput(nInput: number) {
    console.log(this.n);
      this.n = nInput;
    console.log(this.n);
    this.initializeGrid();
  }

  initializeGrid() {
    this.grid=[];
      for(let row=0; row<this.n; ++row) {
        this.grid.push([]);
        for(let col=0; col<this.n; ++col) {
          this.grid[row].push(new GridCell());
    }
   }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackByRowIndex(index: number, _item: GridCell[]): number {
    return index;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackByCellIndex(index: number, _item: GridCell): number {
    return index;
  }

  onKeydown(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    if (!event.ctrlKey) {
      switch (event.key) {
          case 'ArrowUp':
            this.moveFocus(rowIndex - 1, colIndex);
            break;
          case 'ArrowDown':
            this.moveFocus(rowIndex + 1, colIndex);
            break;
          case 'ArrowLeft':
            this.moveFocus(rowIndex, colIndex - 1);
            break;
          case 'ArrowRight':
            this.moveFocus(rowIndex, colIndex + 1);
            break;
        }
      }
  }
  moveFocus(rowIndex: number, arg1: number) {
    throw new Error('Method not implemented.');
  }

}
