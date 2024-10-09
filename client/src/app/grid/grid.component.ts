import { Component, ElementRef, Renderer2 } from '@angular/core';

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
  grid: GridCell[][] = [];
  currentRow: number = 0;
  currentCol: number = 0;
  typeDirection: string = "right";
  typingDirections: string[] = ["right", "left", "up", "down"];
  currentDirectionIndex: number = 0;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.initializeGrid();
  }

  onSizeInput() {
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




  onClick(event: MouseEvent, col: number, row: number) {
    this.moveFocus(col, row);
  }

  onKeydown(event: KeyboardEvent, row: number, col: number) {
    const cell = this.grid[col][row];
    const inputElement = this.elRef.nativeElement.querySelector(`app-grid-cell[data-col="${col}"][data-row="${row}"] input`);

    if (!event.ctrlKey) {
      switch (event.key) {
          case 'ArrowUp':
            this.moveFocus(col, row - 1);
            break;
          case 'ArrowDown':
            this.moveFocus(col, row + 1);
            break;
          case 'ArrowLeft':
            this.moveFocus(col - 1, row);
            break;
          case 'ArrowRight':
            this.moveFocus(col + 1, row);
            break;
          case 'Backspace':
            cell.value = event.key;
            if (inputElement) {
              this.renderer.setProperty(inputElement, 'value', '');
            }
            if (this.typeDirection === "right") {
              setTimeout(() => this.moveFocus(col - 1, row), 0);
            }
            if (this.typeDirection === "left") {
              setTimeout(() => this.moveFocus(col + 1, row), 0);
            }
            if (this.typeDirection === "up") {
              setTimeout(() => this.moveFocus(col, row + 1), 0);
            }
            if (this.typeDirection === "down") {
              setTimeout(() => this.moveFocus(col, row - 1), 0);
            }
            break;
          default:
            if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
              cell.value = event.key;
              if (inputElement) {
                this.renderer.setProperty(inputElement, 'value', event.key);
              }
              if (this.typeDirection === "right") {
                setTimeout(() => this.moveFocus(col + 1, row), 0);
              }
              if (this.typeDirection === "left") {
                setTimeout(() => this.moveFocus(col - 1, row), 0);
              }
              if (this.typeDirection === "up") {
                setTimeout(() => this.moveFocus(col, row - 1), 0);
              }
              if (this.typeDirection === "down") {
                setTimeout(() => this.moveFocus(col, row + 1), 0);
              }
            }
            break;
        }
      } else{
        if (event.ctrlKey) {
          switch (event.key) {
            case 'Backspace':
            cell.value = event.key;
            if (inputElement) {
              this.renderer.setProperty(inputElement, 'value', '');
            }
        }
        }
      }
  }
  moveFocus(col: number, row: number) {
    if (col >= 0 && col < this.grid.length && row >= 0 && row < this.grid[col].length) {
      this.currentCol = col;
      this.currentRow = row;

      console.log(col, row);

      const cell = document.querySelector(`app-grid-cell[data-col="${col}"][data-row="${row}"] input`);
      console.log(cell);

      if (cell) {
        (cell as HTMLElement).focus();
      }
    }
  }

  cycleTypingDirection() {
    this.currentDirectionIndex = (this.currentDirectionIndex + 1) % this.typingDirections.length;
    this.typeDirection = this.typingDirections[this.currentDirectionIndex];
    console.log(`Typing direction changed to: ${this.typeDirection}`);
  }
}
