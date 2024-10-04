import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-grid-cell',
  templateUrl: 'grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss'],
  providers: [],
  standalone: true,
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
    CommonModule
  ],
})
export class GridCellComponent {
  @Input() editable: boolean = true;
  @Input() value: string = '';
  @Input() edges: { top: boolean, right: boolean, bottom: boolean, left: boolean } = { top: false, right: false, bottom: false, left: false };

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
