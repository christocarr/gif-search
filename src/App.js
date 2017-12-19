import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

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
	
	performSearch = (query = 'puppies') => {
		axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=G7l64tPC4irRIG4kFZlZo7oT57QBo5nK&limit=24`)
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
