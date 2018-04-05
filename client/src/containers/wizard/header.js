/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import auth from '../../utility/auth.service'
import { connect } from 'react-redux'
import { getuserdetails } from '../../redux/actions/basicinfo.actions'
import { resetSocket } from '../../redux/actions/livechat.actions'
import { bindActionCreators } from 'redux'
import { browserHistory, Link } from 'react-router'
import Notification from 'react-web-notification'

class Header extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      ignore: true
    }
    this.handleNotificationOnShow = this.handleNotificationOnShow.bind(this)
    this.onNotificationClick = this.onNotificationClick.bind(this)
  }

  handleNotificationOnShow () {
    this.setState({ignore: true})
    this.props.resetSocket()
  }

  onNotificationClick () {
    window.focus()
    browserHistory.push({
      pathname: '/live',
      state: {session_id: this.props.socketData.session_id}
    })
    this.setState({ignore: true})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.socketSession !== '' && this.state.ignore) {
      this.setState({ignore: false})
    }

    if (nextProps.user) {
      // FS.identify(nextProps.user.email, {
      //   displayName: nextProps.user.name,
      //   email: nextProps.user.email,
      //   // TODO: Add your own custom user variables here, details at
      //   // http://help.fullstory.com/develop-js/setuservars.
      //   reviewsWritten_int: 14
      // })
      console.log('FS identify Executed')
    }
  }
  componentWillMount () {
    this.props.getuserdetails()
  }
  render () {
    return (
      <header className='m-grid__item    m-header ' data-minimize-offset='200' data-minimize-mobile-offset='200' >

        <div className='fb-customerchat'
          data-page_id='151990922046256'
          data-minimized='true'
          data-logged_in_greeting='Hi, Let us know if you find any bugs or have a feature request'
          data-logged_out_greeting='Hi, Let us know if you find any bugs or have a feature request' />

        <Notification
          ignore={this.state.ignore}
          disableActiveWindow
          title={'New Message'}
          onShow={this.handleNotificationOnShow}
          onClick={this.onNotificationClick}
          options={{
            body: 'You got a new message from ' + this.props.socketData.name + ' : ' + this.props.socketData.text,
            lang: 'en',
            dir: 'ltr',
            icon: this.props.socketData.subscriber ? this.props.socketData.subscriber.profilePic : ''
          }}
      />

        <div className='m-container m-container--fluid m-container--full-height'>
          <div className='m-stack m-stack--ver m-stack--desktop'>
            <div className='m-stack__item m-stack__item--fluid m-header-head' id='m_header_nav'>
              <button className='m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark ' id='m_aside_header_menu_mobile_close_btn'>
                <i className='la la-close' />
              </button>

              <div id='m_header_topbar' className='m-topbar  m-stack m-stack--ver m-stack--general'>
                <div className='m-stack__item m-topbar__nav-wrapper'>
                  <ul className='m-topbar__nav m-nav m-nav--inline'>
                    <li className='m-nav__item m-topbar__quick-actions m-topbar__quick-actions--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push m-dropdown--mobile-full-width m-dropdown--skin-light' data-dropdown-toggle='click'>
                      <a href='#' className='m-nav__link m-dropdown__toggle'>
                        <span className='m-nav__link-badge m-badge m-badge--dot m-badge--info m--hide' />
                        <span className='m-nav__link-icon'>
                          <i className='flaticon-share' />
                        </span>
                      </a>
                      <div className='m-dropdown__wrapper'>
                        <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                        <div className='m-dropdown__inner'>
                          <div className='m-dropdown__body m-dropdown__body--paddingless'>
                            <div className='m-dropdown__content'>
                              <div className='m-scrollable' data-scrollable='false' data-max-height='380' data-mobile-max-height='200'>
                                <div className='m-nav-grid m-nav-grid--skin-light'>
                                  <div className='m-nav-grid__row'>
                                    {
                                    (this.props.subscribers &&
                                    this.props.subscribers.length === 0)
                                    ? <Link to='/broadcasts' className='m-nav-grid__item'>
                                      <i className='m-nav-grid__icon flaticon-file' />
                                      <span className='m-nav-grid__text'>Send New Broadcast</span>
                                    </Link>
                                    : <Link to='/broadcasts' className='m-nav-grid__item'>
                                      <i className='m-nav-grid__icon flaticon-file' />
                                      <span className='m-nav-grid__text'>Send New Broadcast</span>
                                    </Link>
                                  }

                                    {
                                    (this.props.subscribers &&
                                    this.props.subscribers.length === 0)
                                    ? <Link to='/poll' className='m-nav-grid__item'>
                                      <i className='m-nav-grid__icon flaticon-time' />
                                      <span className='m-nav-grid__text'>Send New Poll</span>
                                    </Link>
                                    : <Link to='/poll' className='m-nav-grid__item'>
                                      <i className='m-nav-grid__icon flaticon-time' />
                                      <span className='m-nav-grid__text'>Send New Poll</span>
                                    </Link>
                                  }

                                  </div>
                                  <div className='m-nav-grid__row'>

                                    {
                                    (this.props.subscribers &&
                                    this.props.subscribers.length === 0)
                                     ? <Link to='/surveys' className='m-nav-grid__item'>
                                       <i className='m-nav-grid__icon flaticon-folder' />
                                       <span className='m-nav-grid__text'>Send New Survey</span>
                                     </Link>
                                     : <Link to='/surveys' className='m-nav-grid__item'>
                                       <i className='m-nav-grid__icon flaticon-folder' />
                                       <span className='m-nav-grid__text'>Send New Survey</span>
                                     </Link>
                                  }

                                    <Link to='/createworkflow' className='m-nav-grid__item'>
                                      <i className='m-nav-grid__icon flaticon-clipboard' />
                                      <span className='m-nav-grid__text'>Create New Workflow</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className='m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light' data-dropdown-toggle='click'>
                      <a href='#' className='m-nav__link m-dropdown__toggle'>
                        <span className='m-topbar__userpic'>
                          <span className='m-nav__link-text'>{(this.props.user) ? this.props.user.name : 'hello'}</span>
                          <img src={(this.props.user) ? this.props.user.profilePic : ''} className='m--img-rounded m--marginless m--img-centered' alt='' />
                        </span>
                        <span className='m-topbar__username m--hide'>
                          {(this.props.user) ? this.props.user.name : 'Richard Hennricks'}
                        </span>
                      </a>
                      <div className='m-dropdown__wrapper'>
                        <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                        <div className='m-dropdown__inner'>
                          <div className='m-dropdown__header m--align-center'>
                            <div className='m-card-user m-card-user--skin-dark'>
                              <div className='m-card-user__pic'>
                                <img src={(this.props.user) ? this.props.user.profilePic : ''} className='m--img-rounded m--marginless' alt='' />
                              </div>
                              <div className='m-card-user__details'>
                                <span className='m-card-user__name m--font-weight-500'>
                                  {(this.props.user) ? this.props.user.name : 'Richard Hennricks'}
                                </span>
                                <span className='m-card-user__email'>
                                  {(this.props.user) ? this.props.user.email : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='m-dropdown__body'>
                            <div className='m-dropdown__content'>
                              <ul className='m-nav m-nav--skin-light'>
                                <li className='m-nav__section m--hide'>
                                  <span className='m-nav__section-text'>My Pages</span>
                                </li>
                                <li className='m-nav__item'>
                                  <Link to='/live' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-chat-1' />
                                    <span className='m-nav__link-text'>Messages</span>
                                  </Link>
                                </li>
                                <li className='m-nav__separator m-nav__separator--fit' />
                                <li className='m-nav__item'>
                                  <a href='http://kibopush.com/faq/' taregt='_blank' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-info' />
                                    <span className='m-nav__link-text'>FAQ</span>
                                  </a>
                                </li>
                                <li className='m-nav__item'>
                                  <Link to='/settings'>
                                    <i className='m-nav__link-icon flaticon-settings' />
                                    <span className='m-nav__link-text'>&nbsp;&nbsp;&nbsp;Settings</span>
                                  </Link>
                                </li>
                                <li className='m-nav__separator m-nav__separator--fit' />
                                <li className='m-nav__item'>
                                  <a onClick={() => { auth.logout() }} href='/' className='btn m-btn--pill    btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder'>
                                    Logout
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className=' btn btn-sm m-btn m-btn--pill m-btn--gradient-from-focus m-btn--gradient-to-danger'>
                      <a href='http://kibopush.com/user-guide/' target='_blank' style={{color: 'white', textDecoration: 'none'}}> Documentation </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: (state.basicInfo.user),
    socketData: (state.liveChat.socketData),
    socketSession: (state.liveChat.socketSession),
    subscribers: (state.subscribersInfo.subscribers)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getuserdetails: getuserdetails,
    resetSocket: resetSocket
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)