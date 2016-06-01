import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getFeedPhotos, sortByType, getPhotoDetail } from '../actions/photo' //TODO remove getPhotoDetail
import { SORT_DEFAULT, SORT_BY_NAME_ASC, SORT_BY_NAME_DESC } from '../constants/FilterTypes'
import _ from 'lodash'

export const App = React.createClass({

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
    return ( // for Content {...this.props.photo.items}
      <div>
        <Filters/>
        <Content items={items} />
      </div>
    )
  }
})

export const Filters = React.createClass({
  render: function() {
    return (
      <div>
        Filters
        <SortFilters/>
        <ViewFilters/>
      </div>
    )
  }
})

export const SortFilters = React.createClass({

  contextTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  handleClick: function(type, e) {
    e.preventDefault()
    const { dispatch } = this.context
    dispatch(sortByType(type))
  },

  render: function() {
    return (
      <div>
        <button onClick={this.handleClick.bind(null, SORT_DEFAULT)}>Filter by name DEFAULT</button>
        <button onClick={this.handleClick.bind(null, SORT_BY_NAME_ASC)}>Filter by name ASC</button>
        <button onClick={this.handleClick.bind(null, SORT_BY_NAME_DESC)}>Filter by name DESC</button>
        <button>Filter by date</button>
      </div>
    )
  }
})

export const ViewFilters = React.createClass({
  render: function() {
    return (
      <div>
        <span>2x2</span>
        <span>3x3</span>
        <span>5x5</span>
      </div>
    )
  }
})

export const Content = React.createClass({
  render: function() {
    console.log(this.props)
    let { items } = this.props
    // const items = items ? items.map((item, i) => <ContentItem key={i} {...item} />) : []
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
        <a href="#" onClick={this.handleClick}>{this.props.title}</a>
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

export default connect(mapStateToProps)(App)
