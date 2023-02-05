import React, { Component } from "react";
import Loading from "./Loading";
import Newsitem from "./Newsitem";

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
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a4c81365f47a4acfa43ae2bb89d95745&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let array = await data.json();
    this.setState({
      articles: array.articles,
      totalResults: array.totalResults,
      loading: false,
    });

   }

  componentDidMount = async () => {
    this.UpdateNews();
  }
  handleNext = async () => {
    
    this.setState({page: this.state.page + 1 });
    this.UpdateNews();
  };
  handlePrev = async () => {
    
    this.setState({page: this.state.page - 1});
    this.UpdateNews();
  };

  render() {
    return (
      <div>
        <h2 className="text-center" style={{marginTop:'20px'}}>Top Headlines - By News Monkey </h2>
        {this.state.loading && <Loading />}
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

            {!this.state.loading && (
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default News;