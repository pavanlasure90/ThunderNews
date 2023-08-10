import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  constructor(){
    super();
    console.log("Hello I am a constructor from news component")
    this.state={
      articles: [],
      loading: false,
      page: 1

    }
  }

  async componentDidMount(){
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=08141bbf17684ecbb5628a4093e24e34&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData); 
    this.setState({articles: parsedData.articles,
       totalResults:parsedData.totalResults,
      loading: false
    })
  }

  handlePreviousClick = async()=>{
    console.log("prevoius")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=08141bbf17684ecbb5628a4093e24e34&page =${this.state.page -1} &pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData); 
    this.setState({
      page: this.state.page -1,
      articles: parsedData.articles,
      loading: false

    })
  }
  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let nextPage = this.state.page + 1;
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=08141bbf17684ecbb5628a4093e24e34&page=${nextPage}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: nextPage,
        articles: parsedData.articles,
        loading: false
      });
    }
  };
  


  render() {
    return (
      <div className='container my-4'>
        <h1 className='text-center'>Thunder News - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title? element.title:""} description={element.description? element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
        })}
        <div className="container d-flex justify-content-between" >
        <button disabled={this.state.page<=1} type="button" className="btn btn-warning" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>      
        </div>
        
        </div>
      </div>
    )
  }
}

export default News




