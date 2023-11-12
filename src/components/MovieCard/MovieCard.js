import React, { Component } from 'react';

import { Typography, Rate } from 'antd';
import './MovieCard.css';
import format from 'date-fns/format';
import { ConsumerMovie } from '../GenresContext/GenresContext';
import GenresList from '../GenresList/GenresList';
import RatingNumber from '../RatingNumber/RatingNumber';
import outOfPosterImg from './Out_Of_Poster.jpg';

class MovieCard extends Component {

    state = {
      onRatingChange: this.props.onRatingChange,
      id: this.props.film.id,
      poster_path: this.props.film.poster_path,
      overview: this.props.film.overview,
      title: this.props.film.title,
      genre_ids: this.props.film.genre_ids,
      release_date: 
      this.props.film.release_date === '' ? '' : format(new Date(this.props.film.release_date), 'MMMM d, yyyy'),
      vote_average: this.props.film.rating,
    }

    render() {
    const { Text } = Typography;
    const {onRatingChange, id, overview, release_date, title, poster_path, genre_ids
    , vote_average    } = this.state;
  
  
    const imageMovie = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : outOfPosterImg;
  
    function truncate(numberSymbols, useWordBoundary) {
      if (this.length <= numberSymbols) {
        return this;
      }
      const subString = this.substring(0, numberSymbols - 1);
      return `${useWordBoundary ? subString.substring(0, subString.lastIndexOf(' ')) : subString}...`;
    }
    const overviewTruncated = truncate.apply(overview, [100, true]);
    
    return (
      <li className="movies_item movie">
        <div className="movie_content">
          <div className="movie-inner">

        <h3 className="movie_title">{title}</h3>
          <Text type="secondary" className="card-release-date">{release_date}</Text>
        <ConsumerMovie>
        {(genresList) => {
          if(genresList.length === 0 || genre_ids === 0) {
            return (
              <i className="movie__date" style={{ marginBottom: 5, display: 'block' }}>Без жанра</i>)
            } else {
              const movieGenres = genresList.filter((genre) => genre_ids.includes(genre.id))
              return <GenresList genresList={movieGenres} />}}}
      </ConsumerMovie>
              <span className="card-overview">{overviewTruncated}</span>
          <RatingNumber evaluation={vote_average} />
          </div>
        <Rate 
        className="movie_rating"
        allowHalf
        count={10}
        defaultValue={Number(vote_average)}
        style={{fontSize: '15px'}}
        onChange={(newRating) => {
          onRatingChange(id, newRating)
          this.setState({
            vote_average: newRating,
          })
        }}
        />
        </div>
        <img className="card-img" src={imageMovie}/>
      </li>
    )};
};


export default MovieCard;