import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.sass']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  videos: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe(
        (details) => {
          this.movie = details;
          this.movieService.getMovieVideos(+movieId).subscribe(
            (videos) => {
              this.videos = videos.results;
              this.showModal();
            },
            (error) => {
              console.error('Error al cargar los videos de la película', error);
            }
          );
        },
        (error) => {
          console.error('Error al cargar los detalles de la película', error);
        }
      );
    }
  }

  showModal(): void {
    const modalTitle = document.getElementById('movieDetailsModalLabel');
    const modalBody = document.querySelector('#movieDetailsModal .modal-body');
    if (modalTitle && modalBody) {
      modalTitle.textContent = this.movie.title;
      modalBody.innerHTML = `
        <div><strong>Sinopsis:</strong> ${this.movie.overview}</div>
        <div><strong>Calificación:</strong> ${this.movie.vote_average}</div>
        <div><strong>Videos:</strong></div>
        <div>${this.videos.map(video => `
            <div>
              <h5>${video.name}</h5>
              <iframe src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>
            </div>`).join('')}
        </div>
      `;
      const modal = new (window as any).bootstrap.Modal(document.getElementById('movieDetailsModal'));
      modal.show();
    }
  }
}
