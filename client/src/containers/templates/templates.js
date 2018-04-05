import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sidebar from '../../components/sidebar/sidebar'
import Header from '../../components/header/header'
import TemplateSurveys from './templateSurveys'
import TemplatePolls from './templatePolls'
import TemplateBroadcasts from './templateBroadcasts'
import { Link } from 'react-router'

class templates extends React.Component {
  scrollToTop () {
    this.top.scrollIntoView({behavior: 'instant'})
  }
  componentDidMount () {
    this.scrollToTop()
  }
  render () {
    return (
      <div>
        <Header />
        <div style={{float: 'left', clear: 'both'}}
          ref={(el) => { this.top = el }} />
        <div
          className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <Sidebar />
          <div className='m-grid__item m-grid__item--fluid m-wrapper' style={{height: 'fit-content'}}>
            <div className='m-subheader '>
              <Link to='/categories' className='btn m-btn m-btn--gradient-from-success m-btn--gradient-to-accent pull-right'>Category
              </Link>
              <div className='d-flex align-items-center'>
                <div className='mr-auto'>
                  <h3 className='m-subheader__title'>Templates</h3>
                </div>
              </div>
            </div>
            <div className='m-content'>
              <TemplateBroadcasts />
              {
                this.props.user && this.props.user.isSuperUser &&
                <TemplateSurveys />
              }
              {
                this.props.user && this.props.user.isSuperUser &&
                <TemplatePolls />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: (state.basicInfo.user)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(templates)