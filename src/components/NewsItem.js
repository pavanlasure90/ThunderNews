import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title , description , imageUrl, newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://images.hindustantimes.com/tech/img/2023/07/23/960x540/quordle_1654498442093_1690074080103.webp":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
