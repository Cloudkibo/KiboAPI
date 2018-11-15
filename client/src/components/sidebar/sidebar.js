/* eslint-disable camelcase */
/**
 * Created by sojharo on 20/07/2017.
 */

import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Sidebar extends Component {
  render () {
    return (
      <div id='sidebarDiv'>
        <button className='m-aside-left-close  m-aside-left-close--skin-dark ' id='m_aside_left_close_btn'>
          <i className='la la-close' />
        </button>
        <div id='m_aside_left' className='m-grid__item m-aside-left  m-aside-left--skin-dark'>
          <div
            id='m_ver_menu'
            className='m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark m-scroller mCustomScrollbar _mCS_2 mCS-autoHide'
            data-menu-vertical='1'
            data-menu-scrollable='1'>
            <div id='mCSB_2' className='mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside' tabIndex='0' style={{maxHeight: 'none'}}>
              <div id='mCSB_2_container' className='mCSB_container' style={{position: 'relative', top: '0px', left: '0px'}} dir='ltr'>
                <ul className='m-menu__nav  m-menu__nav--dropdown-submenu-arrow '>
                  <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
                    <Link className='m-menu__link m-menu__toggle'>
                      <i className='m-menu__link-icon flaticon-chat-1' title='Live Chat' />
                      <span className='m-menu__link-text'>Menu Item</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div id='mCSB_2_scrollbar_vertical' className='mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical' style={{display: 'block'}}>
              <div className='mCSB_draggerContainer'>
                <div id='mCSB_2_dragger_vertical' className='mCSB_dragger' style={{position: 'absolute', minHeight: '50px', display: 'block', maxHeight: '303px', top: '0px'}}>
                  <div className='mCSB_dragger_bar' style={{lineHeight: '50px'}} />
                </div>
                <div className='mCSB_draggerRail' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  console.log('state in sidebar', state)
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
