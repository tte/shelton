import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Filters from './Filters'
import { getFeedPhotos, getPhotoDetail } from '../actions/photo'
import { SORT_DEFAULT, SORT_BY_NAME_ASC, SORT_BY_NAME_DESC, SORT_BY_DATE_ASC, SORT_BY_DATE_DESC } from '../constants/FilterTypes'
import _ from 'lodash'

export const Dashboard = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  childContextTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  getChildContext: function() {
    return { dispatch: this.props.dispatch }
  },

  componentDidMount: function() {
    const { dispatch } = this.props
    dispatch(getFeedPhotos())
  },

  render: function() {
    const { items } = this.props.photo
    return (
      <div>
        <Filters/>
        <DashboardContent items={items} />
      </div>
    )
  }
})

export const DashboardContent = React.createClass({
  render: function() {
    let { items } = this.props
    items = items.map((item, i) => <DashboardContentItem key={i} {...item} />)
    return (
      <div className="box">
        {items}
      </div>
    )
  }
})

export const DashboardContentItem = React.createClass({

  contextTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  handleClick: function(e) {
    const { dispatch } = this.context
    dispatch(getPhotoDetail(this.props))
  },

  render: function() {
    const { photo_id, media, title, date_taken, author } = this.props
    return (
      <div>
        <article className="media">
          <div className="media-left">
            <figure className="image is-240x240">
              <Link to={`/photo/${photo_id}`} onClick={this.handleClick}>
                <img className="is-fullwidth" src={media.m}></img>
              </Link>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{title}</strong> <small>{ author }</small>
                <br/>
                {date_taken}
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  }
})

const sortItems = function(items, type) {
  switch(type) {
    case SORT_BY_NAME_ASC:
      return _.sortBy(items, ['title'])
    case SORT_BY_NAME_DESC:
      return _.sortBy(items, ['title']).reverse()
    case SORT_BY_DATE_ASC:
      return _.sortBy(items, ['date_taken'])
    case SORT_BY_DATE_DESC:
      return _.sortBy(items, ['date_taken']).reverse()
    default:
      return items
  }
}

const mapStateToProps = (store) => {
  const { photo } = store

  return Object.assign({}, photo, { photo: { items: sortItems(photo.items, photo.sortType) }})
}

export default connect(mapStateToProps)(Dashboard)
