import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'
import propTypes from "prop-types"

class News extends Component {
   //setting default values for props
    static propTypes = {
        country: propTypes.string,
        category: propTypes.string
    }
    static defaultProps = {
        country: "us",
        category: "general"
    }
    constructor() {
        super()
        this.state = { "articles": [], page: 1, totalResults: 0, nextDisabled: false, prevDisabled: true, pageSize: 10, spinnerActivated: true }//news.articles
        console.log(this.state)
       
    }

    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbbeb05c4aa441feb13a0049127ac156&pageSize=${this.state.pageSize}&page=${this.state.page}`
        const res = await fetch(url)
        const data = await res.json()
        console.log(`data is ${data}`)
        this.setState({ "articles": data.articles, "totalResults": data.totalResults },
            () => { this.setState({ spinnerActivated: false }) });
        console.log(`the state now is ${this.state.articles}`)
        //changing the title according to category opened
        document.title=`NewsOnline-${!this.props.category?"NewsOnline":this.props.category}`
       
    }

    nextPage = async () => {
        //set the state of spinner on
        this.setState({ spinnerActivated: true })
        //if current page no is smaller than the totalResults/20 (max elements on one page is 20 and totalResults are the total no of news on all pages  )
        if ((this.state.page + 1) <= Math.ceil(this.state.totalResults / 20)) {
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbbeb05c4aa441feb13a0049127ac156&pageSize=${this.state.pageSize}&page=${this.state.page + 1}`
            const res = await fetch(url)
            const data = await res.json()
            this.setState({ "articles": data.articles },
                () => { this.setState({ spinnerActivated: false }) });
            this.setState({ "page": this.state.page + 1 }, () => {
                console.log("updated");
                console.log(`now page is ${this.state.page}`)
                console.log(this.state.page)
                if (this.state.page === 2) {
                    console.log("here")
                    this.setState({ "prevDisabled": false });
                    let element = document.getElementById("prev")
                    element.classList.add("btn-warning")
                }
                if ((this.state.page + 1) > Math.ceil(this.state.totalResults / 20)) {
                    console.log(`the state now is ${this.state.page}`)
                    this.setState({ "nextDisabled": true });
                    let element = document.getElementById("next")
                    element.classList.remove("btn-warning")
                }
            });


        }
    }

    prevPage = async () => {
        //start the spinner
        this.setState({ spinnerActivated: true })
        //if current page no is smaller than the totalResults/20 (max elements on one page is 20 and totalResults are the total no of news on all pages  )
        if ((this.state.page - 1) >= 1) {
            console.log("here")
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbbeb05c4aa441feb13a0049127ac156&pageSize=${this.state.pageSize}&page=${this.state.page - 1}`
            const res = await fetch(url)
            const data = await res.json()
            this.setState({ "articles": data.articles, "page": this.state.page - 1 }, () => {
                if ((this.state.page - 1) === 0) {
                    this.setState({ prevDisabled: true, spinnerActivated: false });
                    let element = document.getElementById("prev")
                    element.classList.remove("btn-warning")

                    this.setState({ "nextDisabled": false });
                    let element2 = document.getElementById("next")
                    element2.classList.add("btn-warning")
                }
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <h1>Headlines-{this.props.category}</h1>
                {this.state.spinnerActivated && <Loader></Loader>}
                {
                    this.state.articles.map((val, index, array) => {
                        //console.log(val)

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
                                    source={this.state.articles[index * 3].source.name}>
                                    </NewsItem>:
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
                                    source={this.state.articles[index * 3 + 1].source.name}>
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
                                    source={this.state.articles[index * 3 + 2].source.name}>
                                    </NewsItem> :
                                    null
                                }
                            </div>
                        )

                    })
                }

                <div className="d-flex justify-content-between my-3">
                    <button type="button" className="btn btn-outline-dark w-30" id="prev" onClick={() => { this.prevPage() }} disabled={this.state.prevDisabled} >Prev</button>
                    <button type="button" className="btn btn-warning btn-outline-dark w-30" id="next" onClick={() => { this.nextPage() }} disabled={this.state.nextDisabled}>Next</button>
                </div>

            </div>
        )
    }
}



export default News;

