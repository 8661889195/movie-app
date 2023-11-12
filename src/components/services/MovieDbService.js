const options = {
  method: 'GET',
  headers: {
    // URL: `${this.baseUrl}guest_session/guest_session_id/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGFjNGVmMjBhYWM1OWE5ZTUwZDQ1YjJkNmZmYjJjNSIsInN1YiI6IjY1M2NiNmEyYzhhNWFjMDBjNmQ2NzBlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uN4NcePjWI8P5m_LbH6o20QiWEelXnksr3Q032o2uDo',
  }
}


export default class MovieDbService {

  
  // getResource = async (url, options) => {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       throw new Error(`${res.status}`);
  //     }
  //     return await res.json();
  //   } catch (err) {
  //     console.error('Проблема', err.message);
  //     return err.message
  //   }
  // }
  
  apiKey = 'e0ac4ef20aac59a9e50d45b2d6ffb2c5';

  baseUrl = 'https://api.themoviedb.org/3/';

  queryString = 'return';

  pagePage = 1;

  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Возможно не правильный путь ссылки ${url}  ${res.status}`)
      //
    }

    const body = await res.json()

    return body
  }

  getAllMovie = async (page, query) => {
    this.queryString = query;
    this.pagePage = page;
    const res = await this.getResource(`${this.baseUrl}search/movie?api_key=${this.apiKey}&include_adult=false&query=${this.queryString}&page=${this.pagePage}`);
    return res;
  }

  getGenresMovie = async() => {
    const res = await this.getResource(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`, options);
    return res;
  }
}