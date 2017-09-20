/* eslint-disable no-undef */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { loadSubscribersList } from '../../redux/actions/subscribers.actions'
import {
  addBroadcast,
  clearAlertMessage,
  loadBroadcastsList,
  sendbroadcast
} from '../../redux/actions/broadcast.actions'
import { bindActionCreators } from 'redux'

class Image extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props, context) {
    super(props, context)
    this._onChange = this._onChange.bind(this)
    this.state = {
      imgSrc: ''
    }
  }

  componentDidMount () {
    require('../../../public/js/jquery-3.2.0.min.js')
    require('../../../public/js/jquery.min.js')
    var addScript = document.createElement('script')
    addScript.setAttribute('src', '../../../js/theme-plugins.js')
    document.body.appendChild(addScript)
    addScript = document.createElement('script')
    addScript.setAttribute('src', '../../../js/material.min.js')
    document.body.appendChild(addScript)
    addScript = document.createElement('script')
    addScript.setAttribute('src', '../../../js/main.js')
    document.body.appendChild(addScript)
  }

  _onChange () {
  // Assuming only image
    var file = this.refs.file.files[0]
    var reader = new FileReader()
    var url = reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      this.setState({
        imgSrc: [reader.result]
      })
    }.bind(this)
    console.log(url) // Would see a path?
  // TODO: concat files
  }

  render () {
    return (
      <div className='ui-block hoverborder' style={{minHeight: 100, maxWidth: 400, padding: 25}}>
        <input
          ref='file'
          type='file'
          name='user[image]'
          multiple='true'
          onChange={this._onChange} style={{position: 'absolute', opacity: 0, minHeight: 150, margin: -25, zIndex: 5, cursor: 'pointer'}} />
        {

          (this.state.imgSrc === '')
          ? <div className='align-center'>
            <img src='icons/picture.png' style={{pointerEvents: 'none', zIndex: -1, maxHeight: 40}} alt='Text' />
            <h4 style={{pointerEvents: 'none', zIndex: -1}}> Image </h4>
          </div>
          : <img style={{maxWidth: 375, margin: -25, padding: 25}} src={this.state.imgSrc} />
        }

      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    broadcasts: (state.broadcastsInfo.broadcasts),
    successMessage: (state.broadcastsInfo.successMessage),
    errorMessage: (state.broadcastsInfo.errorMessage),
    subscribers: (state.subscribersInfo.subscribers)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadBroadcastsList: loadBroadcastsList,
    addBroadcast: addBroadcast,
    sendbroadcast: sendbroadcast,
    clearAlertMessage: clearAlertMessage,
    loadSubscribersList: loadSubscribersList
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Image)