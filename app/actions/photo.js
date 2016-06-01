import fetchJsonp from 'fetch-jsonp'
import {
  REQUEST_FEED_PHOTOS,
  RECEIVE_FEED_PHOTOS,
  REQUEST_PHOTO_SIZE,
  RECEIVE_PHOTO_SIZE,
  SORT_BY_TYPE } from '../constants/ActionTypes'
import { FLICKR_PUBLIC_FEED, FLICKR_REST } from '../constants/UrlList'
import { FLICKR_API_KEY } from '../constants/Secure'

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
  return dispatch => {
    dispatch(requestFeedPhotos())
    fetchJsonp(`${FLICKR_PUBLIC_FEED}?format=json`, // &id=52295245@N03
      { method: 'GET', jsonpCallback: 'jsoncallback' })
      .then(res => res.json())
      .then(res => dispatch(receiveFeedPhotos(res.items)))
      .catch(err => console.log(err))
  }
}

export function sortByType(type) { // TODO move to app
  return {
    type: SORT_BY_TYPE,
    sortType: type
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
    item: Object.assign({}, item, { sizes: sizes })
  }
}

export function fetchPhotoSizes(item) {
  return dispatch => {
    dispatch(requestPhotoSize())
    fetchJsonp(`${FLICKR_REST}?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&format=json&photo_id=${item.photo_id}`,
      { method: 'GET', jsonpCallback: 'jsoncallback' })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(receivePhotoSize(item, res.sizes.size)) // learn how to safe-reading
      }) //
      .catch(err => console.log(err))
  }
}

export function getPhotoDetail(item) {
  return dispatch => {
    if(item.hasOwnProperty('sizes')) {
      dispatch(receivePhotoSize(item))
    } else {
      // это и есть requestPhotoSize по сути
      dispatch(fetchPhotoSizes(item))
    }
  }
}
