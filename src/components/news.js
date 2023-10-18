import { useState, useEffect } from "react";
import Loading from "./Loading";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
//document.title = `${props.category} - NewsFlix`;
   


  const UpdateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    
    let data = await fetch(url);
    props.setProgress(50);
    let array = await data.json();
    setarticles(array.articles)
    settotalResults(array.totalResults)
    setloading(false)
    
    props.setProgress(100);

  }

  
  
  
  // handleNext = async () => {

  //   this.setState({page: this.state.page + 1 });
  //   this.UpdateNews();
  // };
  // handlePrev = async () => {

  //   this.setState({page: this.state.page - 1});
  //   this.UpdateNews();
  // };
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setloading(true)
    
    let data = await fetch(url);
    let array = await data.json();

    setarticles(articles=>articles.concat(array.articles))
    settotalResults(array.totalResults)
    setloading(false)
    setpage(page=>page+1)
    
  }

  const firstcap = (cat)=>{
    return cat.charAt(0).toUpperCase()+cat.slice(1);
  }
  useEffect(() => {
    document.title = `${firstcap(props.category)} - NewsFlix`;
    UpdateNews()
    // eslint-disable-next-line
  }, [])

  return (
    <div >
      <h2 className="text-center" style={{ marginTop: '60px' }}>NewsFlix - Top {firstcap(props.category)} Headlines</h2>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="container my-3">
          <div className="row">


            {articles.map((element) => {
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
                  Math.ceil(this.state.totalResults / props.pageSize) === this.state.page
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
News.defaultProps = {
  category: 'general'
}

export default News;
