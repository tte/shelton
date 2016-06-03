import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { sortByType, changeViewType } from '../actions/filter'
import {
  SORT_DEFAULT,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  SORT_BY_DATE_ASC,
  SORT_BY_DATE_DESC,
  VIEW_DEFAULT,
  VIEW_BY_2,
  VIEW_BY_3,
  VIEW_BY_5 } from '../constants/FilterTypes'

export const Filters = React.createClass({

  render: function() {
    return (
      <div className="filters">
        <SortFilterList/>
        <ViewFilterList/>
      </div>
    )
  }
})

export const SortFilterList = React.createClass({

  contextTypes: {
    dispatch: PropTypes.func.isRequired,
    sortType: PropTypes.object.isRequired,
  },

  handleToggle: function(type, e) {
    e.preventDefault()
    const { dispatch, sortType } = this.context

    dispatch(sortByType(this.getSortType(type, sortType)))
  },

  getSortType: function(type, current) {
    switch(type) {
      case 'title':
        return current === SORT_BY_NAME_ASC ? SORT_BY_NAME_DESC : SORT_BY_NAME_ASC
      case 'date_taken':
        return current === SORT_BY_DATE_ASC ? SORT_BY_DATE_DESC : SORT_BY_DATE_ASC
      default:
        return SORT_DEFAULT
    }
  },

  render: function() {
    const { sortType } = this.context
    return (
      <div className="control is-grouped">
        <span className="control">
          <span className="button" onClick={this.handleToggle.bind(null, SORT_DEFAULT.target)}>
            По умолчанию&nbsp;
          </span>
        </span>
        <span className="control">
          <span className="button" onClick={this.handleToggle.bind(null, SORT_BY_NAME_ASC.target)}>
            По названию&nbsp;
            <i className={"fa fa-angle-" + (sortType.target === 'title' ? sortType.order === 'ASC' ? 'up' : 'down' : false)}></i>
          </span>
        </span>
        <span className="control">
          <span className="button" onClick={this.handleToggle.bind(null, SORT_BY_DATE_ASC.target)}>
            По дате&nbsp;
            <i className={"fa fa-angle-" + (sortType.target === 'date_taken' ? sortType.order === 'ASC' ? 'up' : 'down' : false)}></i>
          </span>
        </span>
      </div>
    )
  }
})

export const ViewFilterList = React.createClass({

  contextTypes: {
    dispatch: PropTypes.func.isRequired,
    viewType: PropTypes.object.isRequired,
  },

  getDefaultProps: function() {
    return {
      items: [
        VIEW_DEFAULT,
        VIEW_BY_2,
        VIEW_BY_3,
        VIEW_BY_5
      ]
    }
  },

  handleClick: function(item, e) {
    e.preventDefault()
    const { dispatch } = this.context
    dispatch(changeViewType(item))
  },

  render: function() {
    const { viewType } = this.context
    const items = this.props.items.map(item => <ViewFilterItem key={item.name} {...item} selected={viewType === item} onClick={this.handleClick.bind(null, item)}/>)
    return (
      <div className="control has-addons">
        {items}
      </div>
    )
  }
})

export const ViewFilterItem = React.createClass({

  render: function() {
    const { label, selected } = this.props
    return (
      <span className={"button" + (selected ? ' is-disabled' : '')} onClick={this.props.onClick}>{label}</span>
    )
  }
})

export default Filters
