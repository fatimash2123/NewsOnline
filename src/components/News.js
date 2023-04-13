import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'
import propTypes from "prop-types"
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingBar from 'react-top-loading-bar';

class News extends Component {
    //setting default values for props
    static propTypes = {
        country: propTypes.string,
        category: propTypes.string
    }
    static defaultProps = {
        country: "us",
        category: "general",
        progress: 0
    }
    constructor() {
        super()
        this.state = { "articles": [], page: 1, totalResults: 0, nextDisabled: false, prevDisabled: true, pageSize: 10, spinnerActivated: true }//news.articles
        console.log(this.state)

    }
    setProgress = (progress) => {
        this.setState({ "progress": progress })
    }
    changeProgress = (progress) => {
        alert(typeof (this.props.setProgress))
        this.props.setProgress(progress)
    }
    async componentDidMount() {
        this.setProgress(30)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbbeb05c4aa441feb13a0049127ac156&pageSize=${this.state.pageSize}&page=${this.state.page}`
        const res = await fetch(url)
        const data = await res.json()
        this.setProgress(70)
        console.log(`data is ${data}`)
        this.setState({ "articles": data.articles, "totalResults": data.totalResults },
            () => { this.setState({ spinnerActivated: false }) });
        console.log(`the state now is ${this.state.articles}`)
        this.setProgress(100)
        //changing the title according to category opened
        document.title = `NewsOnline-${!this.props.category ? "NewsOnline" : this.props.category}`
    }



    fetchData = () => {
        this.setState({ "page": this.state.page + 1 }, async () => {
            this.setProgress(30)
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbbeb05c4aa441feb13a0049127ac156&pageSize=${this.state.pageSize}&page=${this.state.page}`
            const res = await fetch(url)
            const data = await res.json()
            this.setProgress(70)
            console.log(`upcoming data is ${data[0]}`)
            this.setState({ articles: this.state.articles.concat(data.articles), spinnerActivated: false });

            this.setProgress(100)
        })


    }

    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Loader></Loader>}
            >
                <div className='container'>
                    <LoadingBar
                        height={3}
                        color="red"
                        progress={this.state.progress}>

                    </LoadingBar>
                    <h1>Headlines-{this.props.category}</h1>
                    {this.state.spinnerActivated && <Loader></Loader>}
                    {
                        this.state.articles.map((val, index, array) => {
                            return (
                                <div className="row mt-2" key={index}>
                                    {this.state.articles[index * 3] !== undefined ?
                                        <NewsItem className="col-sm-4"
                                            title={this.state.articles[index * 3].title}
                                            url={this.state.articles[index * 3].url}
                                            description={this.state.articles[index * 3].description}
                                            imageURL={this.state.articles[index * 3].urlToImage ? this.state.articles[index * 3].urlToImage : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"}
                                            author={this.state.articles[index * 3].author}
                                            publishedAt={this.state.articles[index * 3].publishedAt}
                                            source={this.state.articles[index * 3].source.name}
                                        >
                                        </NewsItem> :
                                        null
                                    }
                                    {this.state.articles[index * 3 + 1] !== undefined ?
                                        <NewsItem className="col-sm-4"
                                            title={this.state.articles[index * 3 + 1].title}
                                            url={this.state.articles[index * 3 + 1].url}
                                            description={this.state.articles[index * 3 + 1].description}
                                            imageURL={this.state.articles[index * 3 + 1].urlToImage ? this.state.articles[index * 3 + 1].urlToImage : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"}
                                            author={this.state.articles[index * 3 + 1].author}
                                            publishedAt={this.state.articles[index * 3 + 1].publishedAt}
                                            source={this.state.articles[index * 3 + 1].source.name}
                                        >
                                        </NewsItem> :
                                        null
                                    }
                                    {this.state.articles[index * 3 + 2] !== undefined ?
                                        <NewsItem className="col-sm-4"
                                            title={this.state.articles[index * 3 + 2].title}
                                            url={this.state.articles[index * 3 + 2].url}
                                            description={this.state.articles[index * 3 + 2].description}
                                            imageURL={this.state.articles[index * 3 + 2].urlToImage ? this.state.articles[index * 3 + 2].urlToImage : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"}
                                            author={this.state.articles[index * 3 + 2].author}
                                            publishedAt={this.state.articles[index * 3 + 2].publishedAt}
                                            source={this.state.articles[index * 3 + 2].source.name}
                                        >
                                        </NewsItem> :
                                        null
                                    }
                                </div>
                            )

                        })
                    }


                </div>
            </InfiniteScroll>
        )
    }
}



export default News;

