import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Filters from './Filters'
import { getFeedPhotos, getPhotoDetail } from '../actions/photo' //TODO remove getPhotoDetail
import { SORT_DEFAULT, SORT_BY_NAME_ASC, SORT_BY_NAME_DESC } from '../constants/FilterTypes'
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
        <Content items={items} />
      </div>
    )
  }
})



export const Content = React.createClass({
  render: function() {
    console.log(this.props)
    let { items } = this.props
    items = items.map((item, i) => <ContentItem key={i} {...item} />)
    return (
      <div>
        {items}
      </div>
    )
  }
})

export const ContentItem = React.createClass({

  contextTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  handleClick: function(e) {
    e.preventDefault()
    const { dispatch } = this.context
    dispatch(getPhotoDetail(this.props))
  },

  render: function() {
    return (
      <div>
        <a href="#" onClick={this.handleClick}><img src={this.props.media.m}></img>{this.props.title}</a>
      </div>
    )
  }
})

const sortItems = function(items, type) {
  switch(type) {
    case SORT_BY_NAME_ASC:
      return _.orderBy(items, ['title'], ['asc'])
    case SORT_BY_NAME_DESC:
      return _.orderBy(items, ['title'], ['desc'])
    default:
      return items
  }
}

const mapStateToProps = (store) => {
  const { photo } = store

  return Object.assign({}, photo, { photo: { items: sortItems(photo.items, photo.sortType) }})
}

export default connect(mapStateToProps)(Dashboard)
