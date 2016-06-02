import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

export const Layout = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  render: function() {
    console.log(this.props)
    return (
      <div className="this-is-layout">
        <div>
          <Link to="/dashboard">
            dashboard
          </Link>
          <br/>
          <Link to="/detail">
            detail
          </Link>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})


export default connect()(Layout)
