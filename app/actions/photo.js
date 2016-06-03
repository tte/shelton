import fetchJsonp from 'fetch-jsonp'
import {
  REQUEST_FEED_PHOTOS,
  RECEIVE_FEED_PHOTOS,
  REQUEST_PHOTO_SIZE,
  RECEIVE_PHOTO_SIZE } from '../constants/ActionTypes'
import { FLICKR_PUBLIC_FEED, FLICKR_REST } from '../constants/UrlList'
import { FLICKR_API_KEY } from '../constants/Secure'
import { error } from './app'

export function requestFeedPhotos() {
  return {
    type: REQUEST_FEED_PHOTOS
  }
}

export function receiveFeedPhotos(items) {
  return {
    type: RECEIVE_FEED_PHOTOS,
    items: items.map(item => Object.assign(item, { photo_id: item.link.match(/.*\/(\d+)\//i)[1] || 0 }))
  }
}

export function getFeedPhotos() {
  return (dispatch, getState) => {
    const { photo } = getState()
    if(photo.items.length) {
      dispatch(receiveFeedPhotos(photo.items))
    } else {
      dispatch(fetchFeedPhotos())
    }
  }
}

export function fetchFeedPhotos() {
  return dispatch => {
    dispatch(requestFeedPhotos())
    fetchJsonp(`${FLICKR_PUBLIC_FEED}?format=json`,
      { method: 'GET', timeout: 10000, jsonpCallback: 'jsoncallback' })
      .then(res => res.json())
      .then(res => dispatch(receiveFeedPhotos(res.items)))
      .catch(err => dispatch(error(err.toString())))
  }
}

export function requestPhotoSize() {
  return {
    type: REQUEST_PHOTO_SIZE
  }
}

export function receivePhotoSize(item, sizes) {
  return {
    type: RECEIVE_PHOTO_SIZE,
    item: Object.assign({}, item, { sizes: sizes || item.sizes })
  }
}

export function fetchPhotoSizes(item) {
  return dispatch => {
    dispatch(requestPhotoSize())
    fetchJsonp(`${FLICKR_REST}?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&format=json&photo_id=${item.photo_id}`,
      { method: 'GET', timeout: 10000, jsonpCallback: 'jsoncallback' })
      .then(res => res.json())
      .then(res => dispatch(receivePhotoSize(item, res.sizes.size))) // to safe-reading
      .catch(err => dispatch(error(err.toString())))
  }
}

export function getPhotoDetail(item) {
  return dispatch => {
    if(item.hasOwnProperty('sizes')) {
      dispatch(receivePhotoSize(item))
    } else {
      dispatch(fetchPhotoSizes(item))
    }
  }
}
