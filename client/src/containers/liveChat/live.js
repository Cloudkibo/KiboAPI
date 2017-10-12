/* eslint-disable no-undef */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { Alert } from 'react-bs-notifier'
import Sidebar from '../../components/sidebar/sidebar'
import Responsive from '../../components/sidebar/responsive'
import Header from '../../components/header/header'
import HeaderResponsive from '../../components/header/headerResponsive'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadSubscribersList } from '../../redux/actions/subscribers.actions'
import {
  addBroadcast,
  clearAlertMessage,
  loadBroadcastsList,
  sendbroadcast
} from '../../redux/actions/broadcast.actions'
import { bindActionCreators } from 'redux'
import { handleDate } from '../../utility/utils'
import ReactPaginate from 'react-paginate'

class LiveChat extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      alertMessage: '',
      type: '',
      broadcastsData: [],
      totalLength: 0
    }
    props.loadBroadcastsList()
    this.sendBroadcast = this.sendBroadcast.bind(this)
    this.displayData = this.displayData.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
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

  displayData (n, broadcasts) {
    console.log(broadcasts)
    let offset = n * 6
    let data = []
    let limit
    let index = 0
    if ((offset + 6) > broadcasts.length) {
      limit = broadcasts.length
    } else {
      limit = offset + 6
    }
    for (var i = offset; i < limit; i++) {
      data[index] = broadcasts[i]
      index++
    }
    this.setState({broadcastsData: data})
  }

  handlePageClick (data) {
    this.displayData(data.selected, this.props.broadcasts)
  }

  gotoEdit (broadcast) {
    this.props.history.push({
      pathname: `/editbroadcast`,
      state: broadcast._id
    })
  }

  sendBroadcast (broadcast) {
    if (this.props.subscribers.length === 0) {
      this.setState({
        alertMessage: 'You dont have any Subscribers',
        type: 'danger'
      })
    } else {
      this.props.sendbroadcast(broadcast)
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps is called')
    if (nextProps.broadcasts) {
      console.log('Broadcasts Updated', nextProps.broadcasts)
      this.displayData(0, nextProps.broadcasts)
      this.setState({ totalLength: nextProps.broadcasts.length })
    }
    this.sendBroadcast = this.sendBroadcast.bind(this)
    if (nextProps.successMessage) {
      this.setState({
        alertMessage: nextProps.successMessage,
        type: 'success'
      })
    } else if (nextProps.errorMessage) {
      this.setState({
        alertMessage: nextProps.errorMessage,
        type: 'danger'
      })
    } else {
      this.setState({
        alertMessage: '',
        type: ''
      })
    }
  }

  render () {
    return (
      <div>
        <Header />
        <HeaderResponsive />
        <Sidebar />
        <Responsive />
        <div className='container'>
          <br /><br /><br /><br /><br /><br />
          <div className='row'>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <div className="ui-block">

                  <div className="ui-block-title">
                    <h6 className="title">Messages</h6>
                  </div>

                  <ul className="widget w-activity-feed notification-list">
                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar49-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">Marina Polson</a> commented on Jason Mark’s <a href="#" className="notification-link">photo.</a>.
                        <span className="notification-date"><time className="entry-date updated" datetime="2004-07-24T18:18">2 mins ago</time></span>
                      </div>
                    </li>

                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar9-sm.jpg" alt="author"/>
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">Jake Parker </a> liked Nicholas Grissom’s <a href="#" className="notification-link">status update.</a>.
                        <span className="notification-date"><time className="entry-date updated" datetime="2004-07-24T18:18">5 mins ago</time></span>
                      </div>
                    </li>




                  </ul>
                </div>
          </div>
            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12'>

              <div className='ui-block popup-chat'>
                <div className='ui-block-title'>
                  <span className='icon-status online' />
                  <h6 className='title'>Mathilda Brinker</h6>
                </div>
                <div className='mCustomScrollbar ps ps--theme_default' data-mcs-theme='dark' data-ps-id='380aaa0a-c1ab-f8a3-1933-5a0d117715f0'>
                  <ul className='notification-list chat-message chat-message-field'>
                    <li>
                      <div className='author-thumb'>
                        <img src='img/avatar14-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <span className='chat-message-item'>Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
                        <span className='notification-date'><time className='entry-date updated' datetime='2004-07-24T18:18'>Yesterday at 8:10pm</time></span>
                      </div>
                    </li>

                    <li>
                      <div className='author-thumb'>
                        <img src='img/author-page.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <span className='chat-message-item'>Don’t worry Mathilda!</span>

                        <span className='chat-message-item'>I already bought everything</span>
                        <span className='notification-date'><time className='entry-date updated' datetime='2004-07-24T18:18'>Yesterday at 8:29pm</time></span>
                      </div>
                    </li>

                    <li>
                      <div className='author-thumb'>
                        <img src='img/avatar14-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <span className='chat-message-item'>Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
                        <span className='notification-date'><time className='entry-date updated' datetime='2004-07-24T18:18'>Yesterday at 8:10pm</time></span>
                      </div>
                    </li>
                  </ul>
                  <div className='ps__scrollbar-x-rail' ><div className='ps__scrollbar-x' tabindex='0' /></div></div>

                <form>

                  <div className='form-group label-floating is-empty'>
                    <label className='control-label'>Press enter to post...</label>
                    <textarea className='form-control' placeholder='' />
                    <div className='add-options-message'>

                      <div className='options-message smile-block'>

                        <ul className='more-dropdown more-with-triangle triangle-bottom-right'>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat1.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat2.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat3.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat4.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat5.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat6.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat7.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat8.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat9.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat10.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat11.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat12.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat13.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat14.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat15.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat16.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat17.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat18.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat19.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat20.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat21.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat22.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat23.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat24.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat25.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat26.png' alt='icon' />
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon-chat27.png' alt='icon' />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <span className='material-input' /></div>

                </form>

              </div>

            </div>
            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <div className="ui-block">
                  <div className="friend-item">
                    <div className="friend-header-thumb">
                      <img src="img/friend3.jpg" alt="friend" />
                    </div>

                    <div className="friend-item-content">

                      <div className="more">
                        <ul className="more-dropdown">
                          <li>
                            <a href="#">Report Profile</a>
                          </li>
                          <li>
                            <a href="#">Block Profile</a>
                          </li>
                          <li>
                            <a href="#">Turn Off Notifications</a>
                          </li>
                        </ul>
                      </div>
                      <div className="friend-avatar">
                        <div className="author-thumb">
                          <img src="img/avatar3.jpg" alt="author" />
                        </div>
                        <div className="author-content">
                          <a href="#" className="h5 author-name">Nicholas Grissom</a>
                          <div className="country">Los Angeles, CA</div>
                        </div>
                      </div>

                      <div className="swiper-container swiper-swiper-unique-id-2 initialized swiper-container-horizontal" id="swiper-unique-id-2">
                        <div className="swiper-wrapper" ><div className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next" data-swiper-slide-index="1" >
                            <p className="friend-about" data-swiper-parallax="-500" >
                              Hi!, I’m Marina and I’m a Community Manager for “Gametube”. Gamer and full-time mother.
                            </p>

                            <div className="friend-since" data-swiper-parallax="-100" >
                              <span>Friends Since:</span>
                              <div className="h6">December 2014</div>
                            </div>
                          </div>
                          <div className="swiper-slide swiper-slide-active" data-swiper-slide-index="0" >
                            <div className="friend-count" data-swiper-parallax="-500" >
                              <a href="#" className="friend-count-item">
                                <div className="h6">49</div>
                                <div className="title">Friends</div>
                              </a>
                              <a href="#" className="friend-count-item">
                                <div className="h6">132</div>
                                <div className="title">Photos</div>
                              </a>
                              <a href="#" className="friend-count-item">
                                <div className="h6">5</div>
                                <div className="title">Videos</div>
                              </a>
                            </div>
                            <div className="control-block-button" data-swiper-parallax="-100" >
                     

                          

                            </div>
                          </div>

                          <div className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev" data-swiper-slide-index="1" >
                            <p className="friend-about" data-swiper-parallax="-500" >
                              Hi!, I’m Marina and I’m a Community Manager for “Gametube”. Gamer and full-time mother.
                            </p>

                            <div className="friend-since" data-swiper-parallax="-100">
                              <span>Friends Since:</span>
                              <div className="h6">December 2014</div>
                            </div>
                          </div>
                        <div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" >
                            <div className="friend-count" data-swiper-parallax="-500" >
                              <a href="#" className="friend-count-item">
                                <div className="h6">49</div>
                                <div className="title">Friends</div>
                              </a>
                              <a href="#" className="friend-count-item">
                                <div className="h6">132</div>
                                <div className="title">Photos</div>
                              </a>
                              <a href="#" className="friend-count-item">
                                <div className="h6">5</div>
                                <div className="title">Videos</div>
                              </a>
                            </div>
                            <div className="control-block-button" data-swiper-parallax="-100" >
                      
                            </div>
                          </div></div>
                        <div className="swiper-pagination pagination-swiper-unique-id-2 swiper-pagination-clickable swiper-pagination-bullets"><span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span><span className="swiper-pagination-bullet"></span></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(LiveChat)
