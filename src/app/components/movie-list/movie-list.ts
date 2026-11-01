
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

interface Movie {
  name: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  poster: string;
  description: string;
  director: string;
  cast: string;
  trailerId?: string;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList {

  searchText = '';
  selectedGenre = 'All';
  selectedMovie: Movie | null = null;
  trailerUrl: SafeResourceUrl | null = null;

  genres: string[] = [
    'All', 'Action', 'Adventure', 'Animation',
    'Biography', 'Comedy', 'Crime', 'Drama',
    'Fantasy', 'Horror', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller', 'War'
  ];

  movies: Movie[] = [

    {
      name: 'The Batman',
      year: 2022,
      genre: 'Crime',
      rating: 7.8,
      duration: '2h 56m',
      poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      description: 'Batman investigates corruption in Gotham City while facing the mysterious Riddler.',
      director: 'Matt Reeves',
      cast: 'Robert Pattinson, Zoë Kravitz, Paul Dano',
      trailerId: 'mqqft2x_Aa4'
    },
    {
      name: 'The Dark Knight',
      year: 2008,
      genre: 'Action',
      rating: 9.0,
      duration: '2h 32m',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      description: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into chaos.',
      director: 'Christopher Nolan',
      cast: 'Christian Bale, Heath Ledger'
    },
    {
      name: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.7,
      duration: '2h 49m',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      description: 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
      director: 'Christopher Nolan',
      cast: 'Matthew McConaughey, Anne Hathaway'
    },
    {
      name: 'Inception',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8,
      duration: '2h 28m',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      description: 'A skilled thief enters dreams to steal secrets and attempt an impossible mission.',
      director: 'Christopher Nolan',
      cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt'
    },
    {
      name: 'Joker',
      year: 2019,
      genre: 'Crime',
      rating: 8.4,
      duration: '2h 2m',
      poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      description: 'A troubled comedian descends into madness and becomes a symbol of chaos.',
      director: 'Todd Phillips',
      cast: 'Joaquin Phoenix, Robert De Niro'
    },
    {
      name: 'Oppenheimer',
      year: 2023,
      genre: 'Biography',
      rating: 8.3,
      duration: '3h',
      poster: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
      description: 'The story of the scientist who led the development of the atomic bomb.',
      director: 'Christopher Nolan',
      cast: 'Cillian Murphy, Emily Blunt'
    },
    {
      name: 'Dune',
      year: 2021,
      genre: 'Sci-Fi',
      rating: 8.0,
      duration: '2h 35m',
      poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      description: 'A young heir travels to a dangerous desert planet holding the most valuable resource in the universe.',
      director: 'Denis Villeneuve',
      cast: 'Timothée Chalamet, Zendaya'
    },
    {
      name: 'Avatar',
      year: 2009,
      genre: 'Adventure',
      rating: 7.9,
      duration: '2h 42m',
      poster: 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
      description: 'A marine discovers a new world and becomes part of an extraordinary civilization.',
      director: 'James Cameron',
      cast: 'Sam Worthington, Zoe Saldaña'
    },
    {
      name: 'Titanic',
      year: 1997,
      genre: 'Romance',
      rating: 7.9,
      duration: '3h 14m',
      poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      description: 'Two young people fall in love aboard the legendary Titanic.',
      director: 'James Cameron',
      cast: 'Leonardo DiCaprio, Kate Winslet'
    },
    {
      name: 'Avengers: Endgame',
      year: 2019,
      genre: 'Action',
      rating: 8.4,
      duration: '3h 1m',
      poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      description: 'The Avengers unite for one final mission to restore the universe.',
      director: 'Anthony and Joe Russo',
      cast: 'Robert Downey Jr., Chris Evans'
    },
    {
      name: 'John Wick',
      year: 2014,
      genre: 'Action',
      rating: 7.4,
      duration: '1h 41m',
      poster: 'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg',
      description: 'A retired assassin returns to the criminal underworld seeking revenge.',
      director: 'Chad Stahelski',
      cast: 'Keanu Reeves, Michael Nyqvist'
    },
    {
      name: 'The Matrix',
      year: 1999,
      genre: 'Sci-Fi',
      rating: 8.7,
      duration: '2h 16m',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      description: 'A computer hacker discovers that reality is not what it seems.',
      director: 'The Wachowskis',
      cast: 'Keanu Reeves, Laurence Fishburne'
    },
    {
      name: 'La La Land',
      year: 2016,
      genre: 'Romance',
      rating: 8.0,
      duration: '2h 8m',
      poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      description: 'An aspiring actress and jazz musician fall in love while pursuing their dreams.',
      director: 'Damien Chazelle',
      cast: 'Ryan Gosling, Emma Stone'
    },
    {
      name: 'Shutter Island',
      year: 2010,
      genre: 'Thriller',
      rating: 8.2,
      duration: '2h 18m',
      poster: 'https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg',
      description: 'A detective investigates a mysterious disappearance at a remote psychiatric facility.',
      director: 'Martin Scorsese',
      cast: 'Leonardo DiCaprio, Mark Ruffalo'
    },
    {
      name: 'The Conjuring',
      year: 2013,
      genre: 'Horror',
      rating: 7.5,
      duration: '1h 52m',
      poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
      description: 'Paranormal investigators help a family experiencing terrifying supernatural events.',
      director: 'James Wan',
      cast: 'Vera Farmiga, Patrick Wilson'
    },
    {
      name: 'Gladiator',
      year: 2000,
      genre: 'Action',
      rating: 8.5,
      duration: '2h 35m',
      poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
      description: 'A betrayed Roman general fights for justice and revenge in the arena.',
      director: 'Ridley Scott',
      cast: 'Russell Crowe, Joaquin Phoenix'
    },
    {
      name: 'The Shawshank Redemption',
      year: 1994,
      genre: 'Drama',
      rating: 9.3,
      duration: '2h 22m',
      poster: 'https://image.tmdb.org/t/p/w500/9cjIGR2sFQ7m3Q5Q5j4kJY6Q7KJ.jpg',
      description: 'Two prisoners build an unexpected friendship while holding on to hope.',
      director: 'Frank Darabont',
      cast: 'Tim Robbins, Morgan Freeman'
    },
    {
      name: 'Spider-Man: No Way Home',
      year: 2021,
      genre: 'Action',
      rating: 8.2,
      duration: '2h 28m',
      poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      description: 'Peter Parker faces the consequences of a spell that changes his world.',
      director: 'Jon Watts',
      cast: 'Tom Holland, Zendaya'
    },
    {
      name: 'The Notebook',
      year: 2004,
      genre: 'Romance',
      rating: 7.8,
      duration: '2h 3m',
      poster: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6e3bY.jpg',
      description: 'A timeless love story about two people separated by circumstances.',
      director: 'Nick Cassavetes',
      cast: 'Ryan Gosling, Rachel McAdams'
    },
    {
      name: 'Mad Max: Fury Road',
      year: 2015,
      genre: 'Adventure',
      rating: 8.1,
      duration: '2h',
      poster: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
      description: 'A high-speed journey across a dangerous post-apocalyptic wasteland.',
      director: 'George Miller',
      cast: 'Tom Hardy, Charlize Theron'
    },
    {
      name: 'The Wolf of Wall Street',
      year: 2013,
      genre: 'Biography',
      rating: 8.2,
      duration: '3h',
      poster: 'https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg',
      description: 'The rise and fall of a stockbroker living a life of excess and ambition.',
      director: 'Martin Scorsese',
      cast: 'Leonardo DiCaprio, Jonah Hill'
    },
    {
      name: 'The Grand Budapest Hotel',
      year: 2014,
      genre: 'Comedy',
      rating: 8.1,
      duration: '1h 39m',
      poster: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
      description: 'A hotel concierge and his lobby boy become involved in a mysterious adventure.',
      director: 'Wes Anderson',
      cast: 'Ralph Fiennes, Tony Revolori'
    },
    {
      name: 'Coco',
      year: 2017,
      genre: 'Animation',
      rating: 8.4,
      duration: '1h 45m',
      poster: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
      description: 'A young musician journeys into the Land of the Dead to discover his family history.',
      director: 'Lee Unkrich',
      cast: 'Anthony Gonzalez, Gael García Bernal'
    },
    {
      name: 'The Shining',
      year: 1980,
      genre: 'Horror',
      rating: 8.4,
      duration: '2h 26m',
      poster: 'https://image.tmdb.org/t/p/w500/9fgh3Ns1iRzlQNYuJyK0ARQZU7w.jpg',
      description: 'A family moves into an isolated hotel where supernatural forces begin to emerge.',
      director: 'Stanley Kubrick',
      cast: 'Jack Nicholson, Shelley Duvall'
    },
    {
      name: 'Gone Girl',
      year: 2014,
      genre: 'Mystery',
      rating: 8.1,
      duration: '2h 29m',
      poster: 'https://image.tmdb.org/t/p/w500/ts996lKsxvjkO2yiYG0ht4qAicO.jpg',
      description: 'A disappearance turns a marriage into a disturbing mystery.',
      director: 'David Fincher',
      cast: 'Ben Affleck, Rosamund Pike'
    },
    {
      name: 'Harry Potter and the Philosopher’s Stone',
      year: 2001,
      genre: 'Fantasy',
      rating: 7.7,
      duration: '2h 32m',
      poster: 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
      description: 'A young wizard discovers his magical identity and begins an extraordinary journey.',
      director: 'Chris Columbus',
      cast: 'Daniel Radcliffe, Emma Watson'
    },
    {
      name: 'The Imitation Game',
      year: 2014,
      genre: 'Biography',
      rating: 8.0,
      duration: '1h 54m',
      poster: 'https://image.tmdb.org/t/p/w500/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg',
      description: 'The story of Alan Turing and the codebreakers who helped change history.',
      director: 'Morten Tyldum',
      cast: 'Benedict Cumberbatch, Keira Knightley'
    },
    {
      name: '1917',
      year: 2019,
      genre: 'War',
      rating: 8.2,
      duration: '1h 59m',
      poster: 'https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg',
      description: 'Two soldiers embark on a dangerous mission during World War I.',
      director: 'Sam Mendes',
      cast: 'George MacKay, Dean-Charles Chapman'
    }
  ];

  get filteredMovies(): Movie[] {
    const query = this.searchText.trim().toLowerCase();

    return this.movies.filter(movie => {
      const matchesSearch =
        !query ||
        movie.name.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.cast.toLowerCase().includes(query) ||
        movie.year.toString().includes(query) ||
        movie.description.toLowerCase().includes(query);

      const matchesGenre =
        this.selectedGenre === 'All' ||
        movie.genre === this.selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }

  get trendingMovies(): Movie[] {
    return this.movies.slice(0, 8);
  }

  moviesForGenre(genre: string): Movie[] {
    return this.movies.filter(movie => movie.genre === genre);
  }

  clearSearch(): void {
    this.searchText = '';
    this.selectedGenre = 'All';
  }

  onPosterError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.src =
      'https://placehold.co/500x750/151515/e50914?text=Poster+Unavailable';
  }

  constructor(private sanitizer: DomSanitizer) { }

  openDetails(movie: Movie): void {
    this.selectedMovie = movie;
    this.trailerUrl = null;

    if (movie.trailerId) {
      const url =
        `https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&mute=1&rel=0`;

      this.trailerUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  closeDetails(): void {
    this.selectedMovie = null;
    this.trailerUrl = null;
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.selectedMovie) {
      this.closeDetails();
    }
  }
}
