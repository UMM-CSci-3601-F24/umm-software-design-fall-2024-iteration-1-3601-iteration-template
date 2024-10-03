import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-grid-cell',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    NgModel,
  ],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.scss'
})
export class GridCellComponent {
  editable: boolean = true;
  value: string = '';
  edges: { top: boolean, right: boolean, bottom: boolean, left: boolean } = { top: false, right: false, bottom: false, left: false };

  onInput(value: string) {
    if (this.validateInput(value)) {
      this.value = value;
    } else {
      this.value = '';
    }
  }

  validateInput(value: string): boolean {
    const regex = /^[A-Za-z]$/;
    return regex.test(value);
  }

  setEdges(edges: { top: boolean, right: boolean, bottom: boolean, left: boolean }) {
    this.edges = edges;
  }

  setEditable(state: boolean) {
    this.editable = state;
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.editable && event.ctrlKey) {
      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
          this.edges.top = !this.edges.top;
          break;
        case 'ArrowRight':
          this.edges.right = !this.edges.right;
          break;
        case 'ArrowDown':
          this.edges.bottom = !this.edges.bottom;
          break;
        case 'ArrowLeft':
          this.edges.left = !this.edges.left;
          break;
        default:
          break;
      }
    }
  }
}
