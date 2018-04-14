/* eslint-disable no-return-assign */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Header from '../../components/header/header'
import { connect } from 'react-redux'
import {editBot, updateStatus, botDetails} from '../../redux/actions/smart_replies.actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import AlertContainer from 'react-alert'

class EditBot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      page: '',
      payload: [],
      isActive: true
    }
    this.createUI = this.createUI.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.createBot = this.createBot.bind(this)
  }

  componentDidMount () {
    document.title = 'KiboPush | Create Workflows'
    if (this.props.location.state) {
      this.props.botDetails(this.props.location.state)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.botDetails) {
      this.setState({id: nextProps.botDetails._id, name: nextProps.botDetails.botName, page: nextProps.botDetails.pageId.pageName, isActive: nextProps.botDetails.isActive, payload: nextProps.botDetails.payload})
    }
  }

  changeStatus (e) {
    this.setState({isActive: e.target.value})
  }

  createUI () {
    let uiItems = []
    for (let i = 0; i < this.state.payload.length; i++) {
      uiItems.push(
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
          <br />
          <div className='panel panel-default field-editor'>
            <div className='panel-heading clearfix'>
              <strong className='panel-title'>Question {i + 1}</strong>
              <div role='toolbar' className='pull-right btn-toolbar'>
                <a className='remove'
                  onClick={this.removeClick.bind(this, i)}>
                  <span className='fa fa-times' />
                </a>
              </div>
            </div>
            <div className='panel-body'>
              <div className='row'>
                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-6'>
                  <div className='form-group' id={'question' + i}>
                    <label style={{fontWeight: 'normal'}}>Enter several variations of same question to train the bot.</label>
                  </div>
                  {this.createMore(i)}
                  <button className='btn btn-primary btn-sm'
                    onClick={this.addMore.bind(this, i)}> Add More
                </button>
                </div>
                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-6' style={{borderLeft: '0.07rem solid #EBEDF2'}}>
                  <br />
                  <br />
                  <br />
                  <div className='m-input-icon m-input-icon--right'>
                    <textarea className='form-control'
                      placeholder='Type the answer of your questions here...'
                      rows='3' onChange={this.handleAnswerChange.bind(this, i)} value={this.state.payload[i].answer} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return uiItems || null
  }

  createMore (payloadIndex) {
    console.log('this.state.payload', this.state.payload)
    let uiItems = []
    for (let i = 0; i < this.state.payload[payloadIndex].questions.length; i++) {
      uiItems.push(
        <div>
          <div className='m-input-icon m-input-icon--right'>
            <input type='text' className='form-control m-input' placeholder='Enter new question here' value={this.state.payload[payloadIndex].questions[i]}
              onChange={this.handleQuestionChange.bind(this, i, payloadIndex)} />
            <span className='m-input-icon__icon m-input-icon__icon--right'>
              <span>
                <i className='fa fa-times-circle' onClick={this.removeQuestion.bind(this, i, payloadIndex)} />
              </span>
            </span>
          </div>
          <br />
        </div>
      )
    }
    return uiItems || null
  }

  addMore (payloadIndex) {
    let payload = this.state.payload
    payload[payloadIndex].questions.push('')
    this.setState({payload: payload})
  }

  addClick () {
    let botQuestions = this.state.payload
    let questions = ['', '', '']
    botQuestions.push({
      'questions': questions,
      'answer': ''
    })
    this.setState({payload: botQuestions})
  }

  removeClick (i) {
    let botQuestions = this.state.payload.slice()
    botQuestions.splice(i, 1)
    this.setState({
      payload: botQuestions
    })
  }

  removeQuestion (i, payloadIndex) {
    let payload = this.state.payload
    payload[payloadIndex].questions = this.state.payload[payloadIndex].questions.slice()
    payload[payloadIndex].questions.splice(i, 1)
    this.setState({payload: payload})
  }

  handleQuestionChange (i, payloadIndex, event) {
    let payload = this.state.payload
    payload[payloadIndex].questions = this.state.payload[payloadIndex].questions.slice()
    payload[payloadIndex].questions[i] = event.target.value
    this.setState({payload: payload})
  }

  handleAnswerChange (i, event) {
    let payload = this.state.payload
    payload[i].answer = event.target.value
    this.setState({payload: payload})
  }

  createBot () {
    console.log('payload', this.state.payload)
    if (this.state.payload.length === 0) {
      this.msg.error('Please enter one question atleast')
      return
    } else {
      for (var i = 0; i < this.state.payload.length; i++) {
        if (this.state.payload[i].questions.length < 3) {
          this.msg.error('You must enter atleast 3 variations of a question')
          return
        } else {
          for (var j = 0; j < this.state.payload[i].questions.length; j++) {
            if (this.state.payload[i].questions[j] === '') {
              this.msg.error('You must enter atleast 3 variations of a question')
              return
            }
          }
        }
        if (this.state.payload[i].answer === '') {
          this.msg.error('You must enter answer of all the questions')
          return
        }
      }
    }
    this.props.editBot({botId: this.state.id, payload: this.state.payload})
    this.props.updateStatus({botId: this.state.id, isActive: this.state.isActive})
    this.msg.success('Bot updated successfully')
  }

  render () {
    var alertOptions = {
      offset: 75,
      position: 'bottom right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
    return (
      <div>
        <AlertContainer ref={a => { this.msg = a }} {...alertOptions} />
        <Header />
        <div
          className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <Sidebar />
          <div className='m-grid__item m-grid__item--fluid m-wrapper'>
            <div className='m-subheader '>
              <div className='d-flex align-items-center'>
                <div className='mr-auto'>
                  <h3 className='m-subheader__title'>Create Bot</h3>
                </div>
              </div>
            </div>
            <div className='m-content'>
              <div className='row'>
                <div
                  className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                  <div id='identity' className='m-portlet m-portlet--mobile' style={{height: '100%'}}>
                    <div className='m-portlet__body'>
                      <div className='col-xl-12'>
                        <div className='form-group' id='titl'>
                          <label className='control-label'>Bot Name:</label>
                          <input className='form-control'
                            value={this.state.name} disabled />
                        </div>
                      </div>
                      <br />
                      <div className='col-xl-12'>
                        <label>Assigned to Page:</label>
                        {this.props.createdBot && this.props.createdBot.pageId &&
                        <span>
                          <img alt='pic' style={{height: '30px'}} src={(this.props.createdBot.pageId.pagePic) ? this.props.createdBot.pageId.pagePic : 'icons/users.jpg'} />&nbsp;&nbsp;
                          <span>{this.props.createdBot.pageId.pageName}</span>
                        </span>
                      }
                      </div>
                      <div className='col-xl-12'>
                        <label className='control-label'>Status:</label>&nbsp;&nbsp;&nbsp;
                        <select className='custom-select' id='m_form_type' value={this.state.isActive} onChange={this.changeStatus} style={{width: '500px'}}>
                          <option key='2' value='true'>Active</option>
                          <option key='3' value='false'>Disabled</option>
                        </select>
                      </div>
                      <br />
                      <div className='col-xl-12'>
                        <h5> Questions </h5>
                        {this.createUI()}
                      </div>

                      <div id='questions' className='col-sm-6 col-md-4'>
                        <button className='btn btn-primary btn-sm'
                          onClick={this.addClick.bind(this)}> Add Questions
                      </button>
                      </div>
                      <br />
                    </div>
                    <div className='m-portlet__foot m-portlet__foot--fit' style={{'overflow': 'auto'}}>
                      <div className='m-form__actions' style={{'float': 'right', 'marginTop': '25px', 'marginRight': '20px', 'marginBottom': '25px'}}>
                        <button className='btn btn-primary'
                          onClick={this.createBot}> Save
                        </button>
                        <Link
                          to='/bots'
                          className='btn btn-secondary' style={{'marginLeft': '10px'}}>
                          Back
                        </Link>
                      </div>
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
  return {
    botDetails: (state.botsInfo.botDetails)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      editBot: editBot,
      updateStatus: updateStatus,
      botDetails: botDetails
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditBot)
