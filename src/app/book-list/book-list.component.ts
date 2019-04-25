import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Author, Book, Image} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {
  books: Book[];

  /*// @Output um events zu werfen
  @Output() showDetailsEvent = new EventEmitter<Book>();

  showDetails(book: Book) {
      // event werfen
      this.showDetailsEvent.emit(book);
  }*/

  constructor(private bs: BookStoreService) { }

    ngOnInit() {
      this.bs.getAll().subscribe(res => this.books = res);
    }

}
