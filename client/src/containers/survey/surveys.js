/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Responsive from '../../components/sidebar/responsive'
import Header from '../../components/header/header'
import HeaderResponsive from '../../components/header/headerResponsive'
import { connect } from 'react-redux'
import { loadSubscribersList } from '../../redux/actions/subscribers.actions'
import {
  loadSurveysList,
  sendsurvey
} from '../../redux/actions/surveys.actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Alert } from 'react-bs-notifier'
import AlertContainer from 'react-alert'
import { handleDate } from '../../utility/utils'
import ReactPaginate from 'react-paginate'

class Survey extends React.Component {
  constructor (props, context) {
    props.loadSurveysList()
    super(props, context)
    this.state = {
      alertMessage: '',
      alertType: '',
      surveysData: [],
      totalLength: 0
    }
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
    document.title = 'KiboPush | Survey'
  }

  displayData (n, surveys) {
    console.log(surveys)
    let offset = n * 5
    let data = []
    let limit
    let index = 0
    if ((offset + 5) > surveys.length) {
      limit = surveys.length
    } else {
      limit = offset + 5
    }
    for (var i = offset; i < limit; i++) {
      data[index] = surveys[i]
      index++
    }
    this.setState({surveysData: data})
  }

  handlePageClick (data) {
    this.displayData(data.selected, this.props.surveys)
  }

  gotoView (survey) {
    // this.props.history.push({
    //   pathname: `/viewsurveydetail/${survey._id}`,
    //   state: survey,
    // })

    this.props.history.push({
      pathname: `/viewsurveydetail`,
      state: survey._id
    })

    // browserHistory.push(`/viewsurveydetail/${survey._id}`)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps called')
    if (nextProps.surveys) {
      console.log('Broadcasts Updated', nextProps.surveys)
      this.displayData(0, nextProps.surveys)
      this.setState({ totalLength: nextProps.surveys.length })
    }
    if (this.props.successTime !== nextProps.successTime) {
      console.log('SuccessMessage: ', nextProps.successMessage)
      this.setState({
        alertMessage: nextProps.successMessage,
        alertType: 'success'
      })
      this.msg.show(nextProps.successMessage, {
        time: 1500,
        type: 'success'
      })
    } else if (this.props.errorTime !== nextProps.errorMessage) {
      console.log('ErrorMessage: ', nextProps.errorMessage)
      this.setState({
        alertMessage: nextProps.errorMessage,
        alertType: 'danger'
      })
      this.msg.show(nextProps.errorMessage, {
        time: 1500,
        type: 'error'
      })
    } else {
      this.setState({
        alertMessage: '',
        alertType: ''
      })
    }
    this.setState({
      alertMessage: '',
      alertType: ''
    })
  }

  showAlert (message, type) {
    console.log('in showAlert')
    this.msg.show(message, {
      time: 1500,
      type: type
    })
  }

  gotoResults (survey) {
    this.props.history.push({
      pathname: `/surveyResult`,
      state: survey._id
    })
  }

  render () {
    console.log('render method survey')
    var alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'light',
      time: 5000,
      transition: 'scale'
    }
    return (
      <div>
        <Header />
        <HeaderResponsive />
        <Sidebar />
        <Responsive />
        <AlertContainer ref={a => { this.msg = a }} {...alertOptions} />

        <div className='container'>
          <br /><br /><br /><br /><br /><br />
          <div className='row'>
            <main
              className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
              <div className='ui-block'>

                {
                this.props.subscribers && this.props.subscribers.length === 0 &&
                <div style={{padding: '10px'}}>
                  <center>
                    <Alert type='info' headline='0 Subscribers' >
                    Your connected pages have zero subscribers. Unless you do not have any subscriber, you will not be able to broadcast message, polls and surveys.
                    To invite subscribers click <Link to='/invitesubscribers' style={{color: 'blue', cursor: 'pointer'}}> here </Link>.
                    </Alert>
                  </center>
                </div>
              }
                <br />

                <div className='birthday-item inline-items badges'>
                  <h3>Surveys</h3>
                  {
                this.props.subscribers && this.props.subscribers.length === 0

                  ? <Link to='addsurvey' className='pull-right'>
                    <button className='btn btn-primary btn-sm' disabled> Create Survey
                    </button>
                  </Link>
                  : <Link to='addsurvey' className='pull-right'>
                    <button className='btn btn-primary btn-sm'> Create Survey
                    </button>
                  </Link>
                }
                  { this.state.surveysData && this.state.surveysData.length > 0
                  ? <div className='table-responsive'>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Created At</th>
                          <th>Sent</th>
                          <th>Seen</th>
                          <th>Responded</th>
                          <th>Actions</th>

                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.surveysData.map((survey, i) => (
                            <tr>
                              <td>{survey.title}</td>
                              <td>{survey.description}</td>
                              <td>{handleDate(survey.datetime)}</td>
                              <td>{survey.sent}</td>
                              <td>{survey.seen}</td>
                              <td>{survey.responses}</td>
                              <td>
                                <button className='btn btn-primary btn-sm'
                                  style={{float: 'left', margin: 2}}
                                  onClick={() => this.gotoView(survey)}>View
                              </button>
                                { this.props.subscribers && this.props.subscribers.length === 0
                                ? <span>
                                  <button className='btn btn-primary btn-sm'
                                    style={{float: 'left', margin: 2}}
                                    onClick={() => this.gotoResults(survey)}>
                                Report
                              </button>

                                  <button className='btn btn-primary btn-sm'
                                    style={{float: 'left', margin: 2}}
                                    onClick={() => this.props.sendsurvey(
                                        survey)}> Send
                              </button>
                                </span>
                              : <span>
                                <button className='btn btn-primary btn-sm'
                                  style={{float: 'left', margin: 2}}
                                  onClick={() => this.gotoResults(survey)}>
                                Report
                              </button>

                                <button className='btn btn-primary btn-sm'
                                  style={{float: 'left', margin: 2}}
                                  onClick={() => this.props.sendsurvey(
                                        survey)}> Send
                              </button>
                              </span>
                              }

                              </td>
                            </tr>

                        ))
                      }
                      </tbody>
                    </table>
                    <ReactPaginate previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={<a>...</a>}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(this.state.totalLength / 5)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'} />
                  </div>
                  : <div className='table-responsive'>
                    <p> No data to display </p>
                  </div>
                }

                </div>
              </div>

            </main>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    surveys: (state.surveysInfo.surveys),
    subscribers: (state.subscribersInfo.subscribers),
    successMessage: (state.surveysInfo.successMessage),
    errorMessage: (state.surveysInfo.errorMessage),
    successTime: (state.surveysInfo.successTime),
    errorTime: (state.surveysInfo.errorTime)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {loadSurveysList: loadSurveysList, sendsurvey: sendsurvey, loadSubscribersList: loadSubscribersList}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Survey)
