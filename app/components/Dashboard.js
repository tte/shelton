import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Filters from './Filters'
import { getFeedPhotos, getPhotoDetail } from '../actions/photo'
import { SORT_DEFAULT, SORT_BY_NAME_ASC, SORT_BY_NAME_DESC, SORT_BY_DATE_ASC, SORT_BY_DATE_DESC } from '../constants/FilterTypes'
import _ from 'lodash'
import moment from 'moment'

export const Dashboard = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  childContextTypes: {
    dispatch: PropTypes.func.isRequired,
    sortType: PropTypes.object.isRequired,
    viewType: PropTypes.object.isRequired
  },

  getChildContext: function() {
    return {
      dispatch: this.props.dispatch,
      sortType: this.props.filter.sortType,
      viewType: this.props.filter.viewType
    }
  },

  componentDidMount: function() {
    const { dispatch } = this.props
    dispatch(getFeedPhotos())
  },

  render: function() {
    return (
      <div>
        <Filters/>
        <DashboardContent {...this.props.photo} {...this.props.filter}/>
      </div>
    )
  }
})

export const DashboardContent = React.createClass({

  render: function() {
    let { items, viewType } = this.props
    items = items.map((item, i) => <DashboardContentItem key={i} {...item} />)

    return (
      <div className={`dashboard-content ${viewType.className}`}>
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
      <div className="dashboard-content-item">
        <Link to={`/photo/${photo_id}`} onClick={this.handleClick}>
          <div className="dashboard-card">
            <div>
              <img className="dashboard-card__image" src={media.m}/>
            </div>
            <div className="dashboard-card__content">
              <h4 className="title">{title}</h4> <p>{author}</p>
              <p><small>{moment(date_taken).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
})

const sortItems = function(items, type) {
  switch(type) {
    case SORT_BY_NAME_ASC:
    case SORT_BY_DATE_ASC:
      return _.sortBy(items, [type.target])
    case SORT_BY_NAME_DESC:
    case SORT_BY_DATE_DESC:
    case SORT_DEFAULT:
      return _.sortBy(items, [type.target]).reverse()
    default:
      return items
  }
}

const mapStateToProps = (store) => {
  let { photo, filter } = store

  photo = Object.assign({}, photo, {
    photo: Object.assign(photo, {
      items: sortItems(photo.items, filter.sortType)
    })
  })

  return { photo, filter }
}

export default connect(mapStateToProps)(Dashboard)
