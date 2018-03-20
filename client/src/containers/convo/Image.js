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
  sendbroadcast,
  uploadRequest
} from '../../redux/actions/broadcast.actions'
import Halogen from 'halogen'
import { uploadImage } from '../../redux/actions/convos.actions'
import { bindActionCreators } from 'redux'

class Image extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props, context) {
    super(props, context)
    this._onChange = this._onChange.bind(this)
    this.setLoading = this.setLoading.bind(this)
    this.state = {
      imgSrc: '',
      showPreview: false,
      loading: false
    }
  }

  componentDidMount () {
    if (this.props.image && this.props.image !== '') {
      this.setState({imgSrc: this.props.image, showPreview: true})
    }
  }

  setLoading () {
    this.setState({loading: false})
  }

  _onChange (images) {
  // Assuming only image
    var file = this.refs.file.files[0]
    var reader = new FileReader()
    var url = reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      this.setState({
        imgSrc: [reader.result]
      })
    }.bind(this)

    this.setState({
      showPreview: false,
      loading: true
    })
    this.props.uploadImage(file, {
      id: this.props.id,
      componentType: 'image',
      fileName: file.name,
      fileurl: '',
      image_url: '',
      type: file.type, // jpg, png, gif
      size: file.size
    }, this.props.handleImage, this.setLoading)

  // TODO: concat files
  }

  render () {
    return (
      <div className='broadcast-component' style={{marginBottom: 40 + 'px'}}>
        <div onClick={() => { this.props.onRemove({id: this.props.id}) }} style={{ float: 'right', height: 20 + 'px', margin: -15 + 'px'}}>
          <span style={{cursor: 'pointer'}} className='fa-stack'>
            <i className='fa fa-times fa-stack-2x' />
          </span>
        </div>
        <div className='ui-block hoverborder' style={{minHeight: 100, maxWidth: 400, padding: 25}}>
          {
          this.state.loading
          ? <div className='align-center'><center><Halogen.RingLoader color='#FF5E3A' /></center></div>
          : <div>
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
              : <img style={{maxWidth: 300, margin: -25, padding: 25}} src={this.state.imgSrc} />
          }
          </div>
          }
          { this.state.showPreview &&
            <div style={{padding: '10px', marginTop: '40px'}}>
              <a href={this.state.imgSrc} target='_blank' download>
                <h6><i className='fa fa-file-image-o' /><strong> Download Image </strong></h6>
              </a>
            </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
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
    loadSubscribersList: loadSubscribersList,
    uploadRequest: uploadRequest,
    uploadImage: uploadImage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Image)
