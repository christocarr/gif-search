import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

//const API_KEY = "f416c1c5a9fc4a69c9e016f866236a06";

//const SECRET = "286e7a85e2ca5462";

export default class App extends Component {
  
  constructor() {
    super();
		
		this.state = {
			gifs: [],
			loading: true
		};
  } 
	
	componentDidMount() {
	/*	axios.get('https://api.giphy.com/v1/gifs/trending?api_key=G7l64tPC4irRIG4kFZlZo7oT57QBo5nK&limit=24')
		.then( response => {
			this.setState({
				gifs: response.data.data
			});
		})
		.catch( error => {
			console.log('Error parsing and fetching data');
		});*/
		
		this.performSearch();
	} 
	
	//https://api.flickr.com/services/rest/?method=flickr.photos.search?q=${query}&api_key=63e1707c6f7e77928963f47182dcaf87&tags=cats&per_page=24&page=1&format=rest
	
	performSearch = (query = 'puppies') => {
		axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search?q=${query}&api_key=f416c1c5a9fc4a69c9e016f866236a06&per_page=24&page=1&format=rest`)
		.then( response => {
			this.setState({
				gifs: response.data.data,
				loading: false
			});
		})
		.catch( error => {
			console.log('Error parsing and fetching data');
		});
	}

  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
					{
						(this.state.loading)?<p>Loading...</p>:<GifList data={this.state.gifs} />
					}
          
        </div>
      </div>
    );
  }
}
