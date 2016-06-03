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
      <div className="photo-detail">
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
        <div className="photo-detail__image--container">
          <img className="photo-detail__image" src={src}></img>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (store, props) => {
  const { photo, filter } = store
  const { params } = props

  const pickedItem = photo.items.filter(item => item.photo_id == params.photo_id)[0]

  // safe-reading pickedItem `source` if exists
  let src = ''
  if(pickedItem.sizes) {
    const currentSize = pickedItem.sizes.filter(item => item.label == filter.pickedSize)[0]
    src = currentSize.hasOwnProperty('source') ? currentSize.source : src
  } else
    src = pickedItem.media.m

  return {
    pickedSize: filter.pickedSize,
    photo: pickedItem,
    src: src
  }
}

export default connect(mapStateToProps)(PhotoDetail)
