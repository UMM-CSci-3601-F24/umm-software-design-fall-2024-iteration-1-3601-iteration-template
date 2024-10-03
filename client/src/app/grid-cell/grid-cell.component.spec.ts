import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GridCellComponent } from './grid-cell.component';

describe('GridCellComponent', () => {
  let component: GridCellComponent;
  let fixture: ComponentFixture<GridCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridCellComponent],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a cell with bolded edges', () => {
    const cell = new GridCellComponent();

    const edges = { top: true, right: false, bottom: true, left: false };
    cell.setEdges(edges);

    expect(cell.edges.top).toBeTrue();
    expect(cell.edges.right).toBeFalse();
    expect(cell.edges.bottom).toBeTrue();
    expect(cell.edges.left).toBeFalse();
  });

  it('should allow input into the cell', () => {
    const fixture = TestBed.createComponent(GridCellComponent);
    const component = fixture.componentInstance;

    component.setEditable(true);
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).not.toBeNull();

    inputElement.value = 'A';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value).toBe('A');
  });

  it('should disallow input into the cell', () => {
    const fixture = TestBed.createComponent(GridCellComponent);
    const component = fixture.componentInstance;

    component.setEditable(false);
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeNull();
  });

  it('should apply correct SCSS style class for bolded edges', () => {
    const fixture = TestBed.createComponent(GridCellComponent);
    const component = fixture.componentInstance;

    const edges = { top: true, right: false, bottom: true, left: true };
    component.setEdges(edges);
    fixture.detectChanges();

    const cellElement: HTMLElement = fixture.nativeElement.querySelector('.cell');

    expect(cellElement.classList).toContain('bold-top');
    expect(cellElement.classList).not.toContain('bold-right');
    expect(cellElement.classList).toContain('bold-bottom');
    expect(cellElement.classList).toContain('bold-left');
  });

  it('should bold edges based on input', () => {
    const fixture = TestBed.createComponent(GridCellComponent);
    const component = fixture.componentInstance;

    const edges = { top: true, right: false, bottom: true, left: true };
    component.setEdges(edges);
    fixture.detectChanges();

    const cellElement: HTMLElement = fixture.nativeElement.querySelector('.cell');

    expect(cellElement.classList).toContain('bold-top');
    expect(cellElement.classList).not.toContain('bold-right');
    expect(cellElement.classList).toContain('bold-bottom');
    expect(cellElement.classList).toContain('bold-left');
  });

  it('should toggle bolded edges on key down with Ctrl when input is focused', () => {
    const fixture = TestBed.createComponent(GridCellComponent);
    const component = fixture.componentInstance;
    const edges = { top: false, right: false, bottom: false, left: false };
    component.setEdges(edges);
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');

    inputElement.focus();
    fixture.detectChanges();

    expect(document.activeElement).toBe(inputElement);

    let event = new KeyboardEvent('keydown', { key: 'ArrowUp', ctrlKey: true });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();

    const cellElement: HTMLElement = fixture.nativeElement.querySelector('.cell');
    expect(component.edges.top).toBeTrue();
    expect(cellElement.classList).toContain('bold-top');
    expect(cellElement.classList).not.toContain('bold-right');
    expect(cellElement.classList).not.toContain('bold-bottom');
    expect(cellElement.classList).not.toContain('bold-left');

    event = new KeyboardEvent('keydown', { key: 'ArrowRight', ctrlKey: true });

    inputElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.edges.top).toBeTrue();
    expect(cellElement.classList).toContain('bold-top');
    expect(cellElement.classList).toContain('bold-right');
    expect(cellElement.classList).not.toContain('bold-bottom');
    expect(cellElement.classList).not.toContain('bold-left');

    event = new KeyboardEvent('keydown', { key: 'ArrowDown', ctrlKey: true });

    inputElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.edges.top).toBeTrue();
    expect(cellElement.classList).toContain('bold-top');
    expect(cellElement.classList).toContain('bold-right');
    expect(cellElement.classList).toContain('bold-bottom');
    expect(cellElement.classList).not.toContain('bold-left');

    event = new KeyboardEvent('keydown', { key: 'ArrowLeft', ctrlKey: true });

    inputElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.edges.top).toBeTrue();
    expect(cellElement.classList).toContain('bold-top');
    expect(cellElement.classList).toContain('bold-right');
    expect(cellElement.classList).toContain('bold-bottom');
    expect(cellElement.classList).toContain('bold-left');
  });
});
