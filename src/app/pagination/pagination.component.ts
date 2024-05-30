import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  onPageClick(page: number): void {
    this.pageChange.emit(page);
  }
}
