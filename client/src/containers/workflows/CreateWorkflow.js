/* eslint-disable no-return-assign */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Responsive from '../../components/sidebar/responsive'
import Header from '../../components/header/header'
import HeaderResponsive from '../../components/header/headerResponsive'
import { connect } from 'react-redux'
import AlertContainer from 'react-alert'
import {
  addWorkFlow,
  loadWorkFlowList
} from '../../redux/actions/workflows.actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

class CreateWorkflow extends React.Component {
  constructor (props) {
    super(props)
    this.gotoWorkflow = this.gotoWorkflow.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.changeKeywords = this.changeKeywords.bind(this)
    this.changeReply = this.changeReply.bind(this)
    this.changeActive = this.changeActive.bind(this)
    this.state = {
      condition: 'message_is',
      keywords: [],
      reply: '',
      isActive: 'Yes'
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

  gotoWorkflow () {
    console.log('Request Object', {
      condition: this.state.condition,
      keywords: this.state.keywords,
      reply: this.state.reply,
      isActive: this.state.isActive
    })
    if (this.state.keywords.length === 0) {
      this.msg.error('Please fill the keywords field')
      return
    }
    if (this.state.reply === '') {
      this.msg.error('Please fill the reply field')
      return
    }

    this.props.addWorkFlow({
      condition: this.state.condition,
      keywords: this.state.keywords,
      reply: this.state.reply,
      isActive: this.state.isActive
    })
    this.props.history.push({
      pathname: '/workflows'
    })
  }

  changeCondition (event) {
    this.setState({condition: event.target.value})
  }

  changeKeywords (event) {
    this.setState({keywords: event.target.value.split(',')})
  }

  changeReply (event) {
    this.setState({reply: event.target.value})
  }

  changeActive (event) {
    this.setState({isActive: event.target.value})
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
      <div>
        <Header />
        <HeaderResponsive />
        <Sidebar />
        <Responsive />
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
        <div className='container'>
          <br />
          <br />
          <br />
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <h2 className='presentation-margin'>Create Workflow</h2>
            <div className='ui-block'>
              <div className='ui-block-content'>
                <label>Rule</label>

                <div className='form-group form-inline'>

                  <select className='input-lg' onChange={this.changeCondition}
                    value={this.state.condition}>
                    <option value='message_is'>Message is</option>
                    <option value='message_contains'>Message Contains</option>
                    <option value='message_begins'>Message Begins with</option>
                  </select>
                </div>
                <div>
                  <label>Keywords (Separated by comma)</label>
                  <input type='text' className='form-control input-lg'
                    onChange={this.changeKeywords}
                    value={this.state.keywords} style={{width: 100 + '%'}}
                    id='keywords'
                    placeholder='Enter keywords separated by comma' />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputReply'>Reply</label>
                  <textarea className='form-control' onChange={this.changeReply}
                    value={this.state.reply} rows='5'
                    id='exampleInputReply' />
                </div>
                <div className='form-group'>
                  <label htmlFor='isActive'>Is Active</label>
                  <select onChange={this.changeActive}
                    value={this.state.isActive} id='isActive'>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </div>

                <button onClick={this.gotoWorkflow} className='btn btn-primary'>
                  Create
                </button>
                <Link to='workflows' className='btn btn-primary'>
                  Back
                </Link>

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
    workflows: (state.workflowsInfo.workflows)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {loadWorkFlowList: loadWorkFlowList, addWorkFlow: addWorkFlow}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkflow)
