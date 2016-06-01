import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import { connect } from 'react-redux'

export const Detail = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="dashboard-transition" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="container dashboard">
            Detail
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

const mapStateToProps = (store) => {
  const { photo } = store

  return { photo }
}

export default connect(mapStateToProps)(Detail)