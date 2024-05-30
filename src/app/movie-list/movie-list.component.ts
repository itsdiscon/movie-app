import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 1, query: string = ''): void {
    this.movieService.getMovies(page, query).subscribe(
      (data) => {
        this.movies = data.results;
        this.totalPages = data.total_pages;
      },
      (error) => {
        console.error('Error al cargar las películas', error);
      }
    );
  }

  searchMovies(query: string): void {
    this.loadMovies(1, query);
  }

  openDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
