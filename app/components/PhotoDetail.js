import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { PICK_SIZE_DEFAULT } from '../constants/FilterTypes'
import { pickPhotoSize } from '../actions/filter'


export const PhotoDetail = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  handleClick: function(size, e) {
    const { dispatch } = this.props
    dispatch(pickPhotoSize(PICK_SIZE_DEFAULT))
  },

  handleChange: function(e) {
    const { dispatch } = this.props
    dispatch(pickPhotoSize(e.target.value))
  },

  render: function() {
    const { photo, pickedSize, src } = this.props
    const itemsOptions = photo.sizes
      ? photo.sizes.map((item, i) => {
          const { label, width, height, active } = item
          return (
            <option key={i} value={label}>
              {`${label} (${width}x${height})`}
            </option>
          )
        })
      : false

    return (
      <div>
        <div className="control is-grouped">
          <span className="control">
            <Link to='/' onClick={this.handleClick}>Назад к списку</Link>
          </span>
          <div className="control">
            <span className="select">
              <select defaultValue={PICK_SIZE_DEFAULT} onChange={this.handleChange}>
                {itemsOptions}
              </select>
            </span>
          </div>
        </div>
        <div>
          <img src={src}></img>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (store, props) => {
  const { photo, filter } = store
  const { params } = props

  const pickedItem = photo.items.filter(item => item.photo_id == params.photo_id)[0] // TODO safe dat

  return {
    pickedSize: filter.pickedSize,
    photo: pickedItem,
    src: pickedItem.sizes
      ? pickedItem.sizes.filter(item => item.label == filter.pickedSize)[0].source // TODO safe dat
      : pickedItem.media.m
  }
}

export default connect(mapStateToProps)(PhotoDetail)
