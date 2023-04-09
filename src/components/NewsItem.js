import React, { Component } from 'react'


export default class NewsItem extends Component {
    render() {
        const { imageURL, title, description,url,author,publishedAt,source } = this.props

        return (
            <div className="card bg-secondary" style={{ width: "30%", boxSizing: "border-box", margin: "1.5%", borderWidth:3,padding:"1%" }}>
                <img src={imageURL} style={{ height: 150 }}
                    className="card-img-top" alt="..."></img>
                <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ width:"100%" }}>
                    <h5 className="card-title " style={{ height: 100,width:"100%", overflow:"hidden" }}>{title}</h5> 
                    <h6 className="card-title" style={{padding:3, overflow:"hidden" }}><span className='position-absolute top-0 bg-danger rounded-pill start-100 badge translate-middle'>{source}</span></h6> 
                    <p className="card-text" style={{ height: 120,width:"100%", overflow:"hidden", textOverflow:"ellipsis" }}>{description}</p>
                    <p className='cart-text'><small>Author: {!author?"Unknown":author}</small></p>
                    <p className='cart-text'><small>Date: {!publishedAt?"Unknown":publishedAt}</small></p>
                    <a type="button" href={url} className="btn btn-warning btn-outline-dark align-middle my-auto text-center " style={{ width: "50%",height:40,overflow:"hidden" }}>Read</a>
                </div>
            </div>
        )
    }
}
