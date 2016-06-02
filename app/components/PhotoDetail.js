import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { PICK_SIZE_DEFAULT } from '../constants/FilterTypes'
import { pickPhotoSize } from '../actions/photo' //TODO remove getPhotoDetail


export const PhotoDetail = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  childContextTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  getChildContext: function() {
    return { dispatch: this.props.dispatch }
  },

  handleClick: function(size, e) {
    console.log('handleClick')
    // e.preventDefault()
    const { dispatch } = this.props
    dispatch(pickPhotoSize(PICK_SIZE_DEFAULT))
  },

  render: function() {
    const { photo, pickedSize, src } = this.props
    const items = photo.sizes // TODO можно вынести в mapStateToProps
      ? photo.sizes.map((item, i) => <PhotoDetailSize key={i} {...item} active={item.label == pickedSize } />) // TODO подсвечиваем выбранный элемент  onClick={this.handleClick.bind(null, item.label)
      : false // TODO spinner component!

    return (
      <div>
        <Link to='/dashboard' onClick={this.handleClick}>Назад к списку</Link>
        Detail
          <div>
            Sizes
            {items}
          </div>
          <div>
            <img src={src}></img>
          </div>
      </div>
    )
  }
})

export const PhotoDetailSize = React.createClass({

  contextTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  render: function() {
    const { label, width, height, source, active } = this.props
    const name = `${label} (${width}x${height})`
    return active
      ? (<span>{name}</span>)
      : (<button className="button" onClick={e => this.context.dispatch(pickPhotoSize(label))}>
          {name}
        </button>)
  }
})

const mapStateToProps = (store, props) => {
  const { photo } = store
  const { params } = props

  const pickedItem = photo.items.filter(item => item.photo_id == params.photo_id)[0] // TODO safe dat

  return {
    pickedSize: photo.pickedSize,
    photo: pickedItem,
    src: pickedItem.sizes
      ? pickedItem.sizes.filter(item => item.label == photo.pickedSize)[0].source // TODO safe dat
      : pickedItem.media.m
  }
}

export default connect(mapStateToProps)(PhotoDetail)
