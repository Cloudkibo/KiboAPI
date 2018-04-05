/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { resendEmail } from '../../redux/actions/signup.actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import auth from '../../utility/auth.service'
import { getuserdetails } from '../../redux/actions/basicinfo.actions'

class ResendEmail extends React.Component {
  constructor (props) {
    super(props)
    props.getuserdetails()
    this.resend = this.resend.bind(this)
  }
  resend () {
    this.props.resendEmail()
  }
  componentDidMount () {
    document.title = 'KiboPush | Add Pages'
  }

  render () {
    return (
      <div>
        <header className='m-grid__item    m-header ' data-minimize-offset='200' data-minimize-mobile-offset='200' >
          <div className='m-container m-container--fluid m-container--full-height'>
            <div className='m-stack m-stack--ver m-stack--desktop'>
              <div className='m-stack__item m-stack__item--fluid m-header-head' id='m_header_nav'>
                <button className='m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark ' id='m_aside_header_menu_mobile_close_btn'>
                  <i className='la la-close' />
                </button>
                <div id='m_header_topbar' className='m-topbar  m-stack m-stack--ver m-stack--general'>
                  <div className='m-stack__item m-topbar__nav-wrapper'>
                    <ul className='m-topbar__nav m-nav m-nav--inline'>
                      <li className='m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light' data-dropdown-toggle='click'>
                        <a onClick={() => { auth.logout() }} href='/' className='btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air' style={{marginTop: '13px'}}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className='m-grid__item m-grid__item--fluid m-wrapper'>
          <br /><br /><br /><br /><br /><br />
          <center>
            <div className='m-login__logo'>
              <a href='#'>
                <img src='img/logo.png' style={{maxWidth: 250}} />
              </a>
            </div>
          </center>
          <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
            <div className='m-grid__item m-grid__item--fluid m-wrapper'>
              <div className='m-content'>
                <div className='m-alert m-alert--icon m-alert--air m-alert--square alert alert-dismissible m--margin-bottom-30' role='alert'>
                  <div className='m-alert__icon'>
                    <i className='flaticon-exclamation m--font-brand' />
                  </div>
                  <div className='m-alert__text'>
                    <div>Your email address is not verified. Please click on the button below to resend the verification email.</div>
                  </div>
                </div>
                {this.props.successMessage &&
                <label>{this.props.successMessage}. Please check your email </label>
                }
                <br />
                <br />
                <center>
                  <button type='submit' id='m_login_signup_submit' className='btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air' onClick={this.resend}>
                    Resend Verification Email
                  </button>
                  {this.props.user && (this.props.user.currentPlan === 'plan_A' || this.props.user.currentPlan === 'plan_ B') &&
                  <Link id='m_login_signup_cancel' to='/dashboard' className='btn btn-outline-focus  m-btn m-btn--pill m-btn--custom'>
                    Cancel
                  </Link>
                }
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    errorMessage: (state.signupInfo.errorMessage),
    successMessage: (state.signupInfo.successMessage),
    user: (state.basicInfo.user)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      getuserdetails: getuserdetails,
      resendEmail: resendEmail
    },
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ResendEmail)