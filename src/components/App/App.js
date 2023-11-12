import React, { Component } from 'react';

import { Spin, Pagination } from 'antd';
import _ from 'lodash';
import CardList from '../CardList/CardList';
import MovieDbService from '../services/MovieDbService';
import { ProviderMovie } from '../GenresContext/GenresContext';
import AppStorage from '../services/Storage';
import Search from '../Search/Search';
import NavTabs from '../NavTabs/NavTabs';
import ErrorCase from '../Error/Error';
import './app.css';

export class App extends Component {

  ratedFilms = new AppStorage('rated-films', window.localStorage);
  callMovieDbService = new MovieDbService();
  
  
  state = {
    movies: [],
    genresList: [],
    totalPages: 0,
    currentPage: 1,
    query: 'return',
    ratedFilmsStorage: this.ratedFilms,
    isLoading: true,
    error: false,
    currentTab: 'Search',
    pageSize: 20,
    offline: false,
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        offline: true,
      })
    }
    this.searchMovies(this.state.currentPage, this.state.query)    
  };

  searchMovies(query, page = 1) {
    this.callMovieDbService.getAllMovie(query, page)
    .then((data) => {
      data.results.forEach((item) => {
        const arrFilmsStorage = this.state.ratedFilmsStorage.getItems()

        const movieWithRate = arrFilmsStorage.filter((withRate) => {
          if(item.id === withRate.id) {
            item.rating = withRate.rating
            return true
          } else {
            return false
          }
        })
        if(movieWithRate.length === 0) {
          item.rating = null
        }
      })
      this.setState({
        movies: data.results,
        totalPages: data.total_pages,
        isLoading: false,
      })  
    })
    this.callMovieDbService.getGenresMovie()
    .then((data) => {
      this.setState({
        genresList: data.genres,
      })
    })
    .catch((err) => {
      console.error('Отсутствие фильмов', err)
      this.setState({
        error: err,
      })
    })
  };


  paginationChangeHandler = (page) => {
    this.setState({
      currentPage: page,
      isLoading: true,
    })

    if (this.state.currentTab === 'Rated') {
      const startIndex = (page - 1) * this.state.pageSize
      const endIndex = startIndex + this.state.pageSize
      console.log(startIndex);

      const maxFilms = this.state.ratedFilmsStorage.getItems()
      const arrFILMStorage = maxFilms.slice(startIndex, endIndex)

      this.setState({
        movies: arrFILMStorage,
        totalPages: maxFilms.length,
        isLoading: false,
      })
    } else {
      this.searchMovies(page, this.state.query)
    }
  }


  tabChangeHandler = (newTab) => {
    if (newTab === this.state.currentTab) return
    if (newTab === 'Search') {
      this.setState({
        currentTab: 'Search',
        isLoading: true,
        currentPage: 1,
      })
      this.searchMovies(this.state.currentPage, this.state.query)
    }
    if (newTab === 'Rated') {
      this.setState({
        currentTab: 'Rated',
        isLoading: true,
        currentPage: 1,
      })

      setTimeout(() => {
        const maxFilms = this.state.ratedFilmsStorage.getItems()

        let startIndex = (this.state.currentPage - 1) * this.state.pageSize

        const endIndex = startIndex + this.state.pageSize

        const arrFILMStorage = maxFilms.slice(startIndex, endIndex)

        this.setState({
          movies: arrFILMStorage,
          totalPages: maxFilms.length,
          isLoading: false,
        })
      }, 0)
    }
  };


  debauncedSearchInputChangeHandler = _.debounce((searchQuery) => {
    if (searchQuery) {
      this.setState({
        isLoading: true,
      })
      this.searchMovies(this.state.currentPage, searchQuery)
    }
  }, 1000)


  filmRateChange = (movieId, newRating) => {
    const index = this.state.movies.findIndex((item) => item.id === movieId)
    const newFilm = Object.assign({}, this.state.movies[index])
    newFilm.rating = newRating

    this.setState({
      movies: [...this.state.movies.slice(0, index), newFilm, ...this.state.movies.slice(index + 1)],
    })
    const storagedFilms = this.state.ratedFilmsStorage.getItems()
    const storageIndex = storagedFilms.findIndex((item) => {
      return item.id === movieId.id
      
    })

  if(!storageIndex) {
    storagedFilms[storageIndex] = newFilm
  } else {
    storagedFilms.unshift(newFilm)
  }

  this.state.ratedFilmsStorage.setItems(storagedFilms)
  }


  render() {
    const {movies, genresList, isLoading, error, query, currentTab} = this.state;
    let contentLoading = isLoading ? (
      <Spin /> ) : (
        <>
        <ProviderMovie value={genresList}>
      <div>
      <CardList movies={movies} onRatingChange={this.filmRateChange}/>
      <Pagination
      style={{ textAlign: 'center' }}
      defaultCurrent={this.state.currentPage}
      pageSize={this.state.pageSize}
      total={this.state.totalPages}
      showSizeChanger={false}
      onChange={this.paginationChangeHandler}
      />
      </div>
      </ProviderMovie>
        </>
      )
    
        if (error) {
          return <ErrorCase type={'error'} name={error.name} message={error.message} /> 
        }


    return (
        <section className="movies">
          <NavTabs onChange={this.tabChangeHandler} />
        
        {currentTab === 'Search' ? (
          <Search searchQuery={query} changeHandler={this.debauncedSearchInputChangeHandler}/>
        ) : null}

        {contentLoading}
        </section>
        // <Tabs defaultActiveKey={this.state.tabPane} onChange={this.changeTab}>
        // <Tabs.TabPane tab="Search" key="1">
        // <input placeholder="Type to search..." type="text"
        // onChange={(e) => this.searchMovies(e, this.state.currentPage)}/>
        
        // </Tabs.TabPane>
        // <Tabs.TabPane tab="Rated" key="2" onChange={this.filmRateChange}>
        
        // </Tabs.TabPane>
        // </Tabs>
      
    ) 
  }
}
