import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps ={
    country:"us",
    category:"general",
    pageSize:8
  }

  static propTypes ={
    country:PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number,

    
  }

  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,//jab bhi koi cheese load ho rahi hogi toh make it true and show spinner and make it false when all data load   
      page:1
    }
  }

  async componentDidMount() {
    console.log("cmd");
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=2573037d3ddc4215bd6e23dc261eb65c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
       articles: parsedData.articles,
       totalResults:parsedData.totalResults,
       loading:false
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");

    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=2573037d3ddc4215bd6e23dc261eb65c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  handleNextClick = async () => {
    console.log("Next");
    // Math.ceil means 4.6=>5,6.8=>7,etc Math.ceil(this.state.totalResults/10(totalResults))=number of pages
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=2573037d3ddc4215bd6e23dc261eb65c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
    }
  }

  render() {
    console.log("render");
    return (
      <div className='container my-3'>
      <h1 className="text-center" style={{margin:'35px 0px'}}>News Monkey -Top Headlines</h1> 
        {/* ek {}-outerbracket for js and {}-for margin */}
        {/* this.state.articles-are our articles,map-is higher order array method hain ,
        jab bhi aap .map() use karte ho toh har ek elements ko iterate karne ke liye aapko har ek element ko ek unique key deni padti hain*/}
     {this.state.loading && <Spinner/>}
     {/* if this.state.loading is true then only show <Spinner/> */}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
          <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

          </div>
        </div>
      </div>
    )
  }
}

export default News
