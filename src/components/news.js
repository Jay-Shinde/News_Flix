import React, { Component } from "react";
import Loading from "./Loading";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: 'general',
  }
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${props.category} - NewsMonkey`;
  }
   async UpdateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let array = await data.json();
    this.setState({
      articles: array.articles,
      totalResults: array.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

   }

  componentDidMount = async () => {
    this.UpdateNews();
  }
  // handleNext = async () => {
    
  //   this.setState({page: this.state.page + 1 });
  //   this.UpdateNews();
  // };
  // handlePrev = async () => {
    
  //   this.setState({page: this.state.page - 1});
  //   this.UpdateNews();
  // };
  fetchMoreData = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let array = await data.json();
    this.setState({
      articles: this.state.articles.concat(array.articles),
      totalResults: array.totalResults,
      loading: false,
      page: this.state.page + 1
    });
  }

  render() {
    return (
      <div >
        <h2 className="text-center" style={{marginTop:'60px'}}>Top Headlines - By NewsFlix </h2>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Loading/>}
        >
        <div className="container my-3">
          <div className="row">

          
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    url={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author}
                    name={element.source.name}
                    
                  />
                </div>
              );
            })}
          
        
            

            {/* {!this.state.loading && (
              <div className="container d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-secondary"
                onClick={this.handlePrev}
              >
                ⬅ Prev
              </button>
              <button
                disabled={
                  Math.ceil(this.state.totalResults / this.props.pageSize) === this.state.page
                }
                type="button"
                className="btn btn-secondary"
                onClick={this.handleNext}
              >
                Next ➡
              </button>
            </div>
            )} */}
          </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
