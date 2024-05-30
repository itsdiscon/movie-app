import { Component, HostListener, OnInit } from '@angular/core';
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
  isLoading: boolean = false;
  query: string = '';

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 1, query: string = ''): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.movieService.getMovies(page, query).subscribe(
      (data) => {
        this.movies = [...this.movies, ...data.results];
        this.totalPages = Math.ceil(data.total_results / 10);  // Ajusta para 10 películas por página
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las películas', error);
        this.isLoading = false;
      }
    );
  }

  searchMovies(query: string): void {
    this.movies = [];
    this.currentPage = 1;
    this.query = query;
    this.loadMovies(1, query);
  }

  openDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadMovies(this.currentPage, this.query);
      }
    }
  }
}
