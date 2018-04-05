/* eslint-disable no-return-assign */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PageLikesSubscribers from '../../components/Dashboard/PageLikesSubscribers'
import CardBoxes from '../../components/Dashboard/CardBoxes'
import CardsWithProgress from '../../components/Dashboard/CardsWithProgress'
import { loadDashboardData, sentVsSeen } from '../../redux/actions/dashboard.actions'
import { bindActionCreators } from 'redux'
import { loadMyPagesList } from '../../redux/actions/pages.actions'
import { fetchSessions } from '../../redux/actions/livechat.actions'
import { loadSubscribersList } from '../../redux/actions/subscribers.actions'
import {
  createbroadcast
} from '../../redux/actions/broadcast.actions'
import AlertContainer from 'react-alert'
import GettingStarted from './gettingStarted'
import { joinRoom, registerAction } from '../../utility/socketio'
import { getuserdetails } from '../../redux/actions/basicinfo.actions'

class Dashboard extends React.Component {
  constructor (props, context) {
    super(props, context)
    props.getuserdetails()
    props.loadMyPagesList()
    props.loadDashboardData()
    props.sentVsSeen()
    props.loadSubscribersList()

    this.state = {
      isShowingModal: false,
      steps: [],
      sentseendata1: []
    }
  }

  scrollToTop () {
    this.top.scrollIntoView({behavior: 'instant'})
  }
  componentWillReceiveProps (nextprops) {
    if (nextprops.user && nextprops.user.emailVerified === false &&
      (nextprops.user.currentPlan === 'plan_C' || nextprops.user.currentPlan === 'plan_D')) {
      browserHistory.push({
        pathname: '/resendVerificationEmail'
      })
    }
    if (nextprops.user) {
      if ((nextprops.user.currentPlan === 'plan_A' || nextprops.user.currentPlan === 'plan_ B') && !nextprops.user.facebookInfo) {
        browserHistory.push({
          pathname: '/connectFb',
          state: { account_type: 'individual' }
        })
      } else if (nextprops.subscribers && nextprops.subscribers.length > 0) {
        // this means more than 0 subscribers
        this.setState({isShowingModal: false})
      } else if (nextprops.pages && nextprops.pages.length > 0 && nextprops.subscribers && nextprops.subscribers.length === 0) {
        // this means 0 subscribers
        this.setState({isShowingModal: true})
      } else if (nextprops.pages && nextprops.pages.length === 0) {
      // this means connected pages in 0
        // browserHistory.push({
          // pathname: '/addPages',
          // state: {showMsg: true}
        // })
      }
      if (nextprops.user) {
        joinRoom(nextprops.user.companyId)
      }
      if (nextprops.sentseendata) {
        var temp = []
        temp.push(nextprops.sentseendata)
        this.setState({sentseendata1: nextprops.sentseendata})
      }
    }
  }

  componentDidMount () {
    document.title = 'KiboPush | Dashboard'
    var compProp = this.props
    registerAction({
      event: 'dashboard_updated',
      action: function (data) {
        compProp.loadMyPagesList()
        compProp.loadDashboardData()
      }
    })
  }

  render () {
    var alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <div className='m-subheader '>
          <div className='d-flex align-items-center'>
            <div className='mr-auto'>
              <h3 className='m-subheader__title'>Dashboard</h3>
            </div>
          </div>
        </div>
        <div className='m-content'>
          <AlertContainer ref={a => this.msg = a} {...alertOptions} />
          {
            this.props.user && (((this.props.user.currentPlan === 'plan_A' || this.props.user.currentPlan === 'plan_ B') && !this.props.user.facebookInfo) || (this.props.user.emailVerified === false &&
              (this.props.user.currentPlan === 'plan_C' || this.props.user.currentPlan === 'plan_D')))
            ? null
            : <div>
              {this.props.user && (this.props.user.role === 'admin' || this.props.user.role === 'buyer') && !this.props.user.wizardSeen &&
              <GettingStarted pages={this.props.pages} />}
            </div>
          }
          <div className='row'>
            {
              this.props.pages && this.props.pages.length > 0 &&
              <PageLikesSubscribers connectedPages={this.props.pages} />
            }
            {
              this.props.dashboard &&
              <CardBoxes data={this.props.dashboard} />
            }
          </div>
          {
            this.props.sentseendata &&
            <CardsWithProgress data={this.props.sentseendata} />
          }
        </div>
      </div>
    )
  }
  }

function mapStateToProps (state) {
  console.log('state', state)
  return {
    user: (state.basicInfo.user),
    dashboard: (state.dashboardInfo.dashboard),
    sentseendata: (state.dashboardInfo.sentseendata),
    pages: (state.pagesInfo.pages),
    subscribers: (state.subscribersInfo.subscribers)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      loadDashboardData: loadDashboardData,
      loadMyPagesList: loadMyPagesList,
      loadSubscribersList: loadSubscribersList,
      createbroadcast: createbroadcast,
      fetchSessions: fetchSessions,
      getuserdetails: getuserdetails,
      sentVsSeen: sentVsSeen
    },
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
