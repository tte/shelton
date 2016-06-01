import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { sortByType } from '../actions/photo' // TODO move to app(?)
import { SORT_DEFAULT, SORT_BY_NAME_ASC, SORT_BY_NAME_DESC } from '../constants/FilterTypes'

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

export default Filters
