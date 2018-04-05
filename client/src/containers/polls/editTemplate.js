/* eslint-disable no-return-assign */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Header from '../../components/header/header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert } from 'react-bs-notifier'
import { loadPollDetails } from '../../redux/actions/templates.actions'
import { addPoll, sendpoll, sendPollDirectly } from '../../redux/actions/poll.actions'
import { loadSubscribersList } from '../../redux/actions/subscribers.actions'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'
import { Link } from 'react-router'
import { getuserdetails } from '../../redux/actions/basicinfo.actions'
import { loadCustomerLists } from '../../redux/actions/customerLists.actions'
import { checkConditions } from './utility'
import AlertContainer from 'react-alert'

class EditPoll extends React.Component {
  constructor (props, context) {
    super(props, context)
    props.getuserdetails()
    if (this.props.currentPoll) {
      const id = this.props.currentPoll._id
      props.loadPollDetails(id)
      props.loadCustomerLists()
    }
    this.state = {
      page: {
        options: []
      },
      Gender: {
        options: [{id: 'male', text: 'male'},
                  {id: 'female', text: 'female'},
                  {id: 'other', text: 'other'}
        ]
      },
      Locale: {
        options: [{id: 'en_US', text: 'en_US'},
                  {id: 'af_ZA', text: 'af_ZA'},
                  {id: 'ar_AR', text: 'ar_AR'},
                  {id: 'az_AZ', text: 'az_AZ'},
                  {id: 'pa_IN', text: 'pa_IN'}
        ]
      },
      stayOpen: false,
      disabled: false,
      pageValue: [],
      genderValue: [],
      localeValue: [],
      alert: false,
      statement: '',
      option1: '',
      option2: '',
      option3: '',
      title: '',
      selectedRadio: '',
      listSelected: '',
      isList: false,
      isShowingModal: false,
      lists: []
    }
    this.createPoll = this.createPoll.bind(this)
    this.updateStatment = this.updateStatment.bind(this)
    this.updateOptions = this.updateOptions.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
    this.handleLocaleChange = this.handleLocaleChange.bind(this)
    this.initializePageSelect = this.initializePageSelect.bind(this)
    this.initializeGenderSelect = this.initializeGenderSelect.bind(this)
    this.initializeLocaleSelect = this.initializeLocaleSelect.bind(this)
    this.handleRadioButton = this.handleRadioButton.bind(this)
    this.initializeListSelect = this.initializeListSelect.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.goToSend = this.goToSend.bind(this)
  }

  componentDidMount () {
    document.title = 'KiboPush | Edit Poll'
    let options = []
    for (var i = 0; i < this.props.pages.length; i++) {
      options[i] = {id: this.props.pages[i].pageId, text: this.props.pages[i].pageName}
    }
    this.setState({page: {options: options}})
    this.initializeGenderSelect(this.state.Gender.options)
    this.initializeLocaleSelect(this.state.Locale.options)
    this.initializePageSelect(options)
  }
  componentWillReceiveProps (nextprops) {
    if (nextprops.customerLists) {
      let options = []
      for (var j = 0; j < nextprops.customerLists.length; j++) {
        if (!(nextprops.customerLists[j].initialList)) {
          options.push({id: nextprops.customerLists[j]._id, text: nextprops.customerLists[j].listName})
        } else {
          if (nextprops.customerLists[j].content && nextprops.customerLists[j].content.length > 0) {
            options.push({id: nextprops.customerLists[j]._id, text: nextprops.customerLists[j].listName})
          }
        }
      }
      this.setState({lists: options})
      this.initializeListSelect(options)
      if (options.length === 0) {
        this.state.selectedRadio = 'segmentation'
      }
    }
    if (nextprops.pollDetails) {
      this.setState({title: nextprops.pollDetails.title, statement: nextprops.pollDetails.statement, option1: nextprops.pollDetails.options[0], option2: nextprops.pollDetails.options[1], option3: nextprops.pollDetails.options[2], categoryValue: nextprops.pollDetails.category})
    }
  }
  showDialog () {
    this.setState({isShowingModal: true})
  }
  closeDialog () {
    this.setState({isShowingModal: false})
  }
  initializeListSelect (lists) {
    var self = this
    /* eslint-disable */
    $('#selectLists').select2({
    /* eslint-enable */
      data: lists,
      placeholder: 'Select Lists',
      allowClear: true,
      tags: true,
      multiple: true
    })
    /* eslint-disable */
    $('#selectLists').on('change', function (e) {
    /* eslint-enable */
      var selectedIndex = e.target.selectedIndex
      if (selectedIndex !== '-1') {
        var selectedOptions = e.target.selectedOptions
        var selected = []
        for (var i = 0; i < selectedOptions.length; i++) {
          var selectedOption = selectedOptions[i].value
          selected.push(selectedOption)
        }
        self.setState({ listSelected: selected })
      }
    })

    /* eslint-disable */
    $('#selectLists').val('').trigger('change')
    /* eslint-enable */
  }
  initializePageSelect (pageOptions) {
    var self = this
    /* eslint-disable */
    $('#selectPage').select2({
    /* eslint-enable */
      data: pageOptions,
      placeholder: 'Default: All Pages',
      allowClear: true,
      multiple: true
    })
    /* eslint-disable */
    $('#selectPage').on('change', function (e) {
    /* eslint-enable */
      var selectedIndex = e.target.selectedIndex
      if (selectedIndex !== '-1') {
        var selectedOptions = e.target.selectedOptions
        var selected = []
        for (var i = 0; i < selectedOptions.length; i++) {
          var selectedOption = selectedOptions[i].value
          selected.push(selectedOption)
        }
        self.setState({ pageValue: selected })
      }
    })
  }

  initializeGenderSelect (genderOptions) {
    var self = this
    /* eslint-disable */
    $('#selectGender').select2({
    /* eslint-enable */
      data: genderOptions,
      placeholder: 'Select Gender',
      allowClear: true,
      multiple: true
    })
    /* eslint-disable */
    $('#selectGender').on('change', function (e) {
    /* eslint-enable */
      var selectedIndex = e.target.selectedIndex
      if (selectedIndex !== '-1') {
        var selectedOptions = e.target.selectedOptions
        var selected = []
        for (var i = 0; i < selectedOptions.length; i++) {
          var selectedOption = selectedOptions[i].value
          selected.push(selectedOption)
        }
        self.setState({ genderValue: selected })
      }
    })
  }

  initializeLocaleSelect (localeOptions) {
    var self = this
    /* eslint-disable */
    $('#selectLocale').select2({
    /* eslint-enable */
      data: localeOptions,
      placeholder: 'Select Locale',
      allowClear: true,
      multiple: true
    })
    /* eslint-disable */
    $('#selectLocale').on('change', function (e) {
    /* eslint-enable */
      var selectedIndex = e.target.selectedIndex
      if (selectedIndex !== '-1') {
        var selectedOptions = e.target.selectedOptions
        var selected = []
        for (var i = 0; i < selectedOptions.length; i++) {
          var selectedOption = selectedOptions[i].value
          selected.push(selectedOption)
        }
        self.setState({ localeValue: selected })
      }
    })
  }

  handlePageChange (value) {
    var temp = value.split(',')
    this.setState({ pageValue: temp })
  }

  handleGenderChange (value) {
    var temp = value.split(',')
    this.setState({ genderValue: temp })
  }

  handleLocaleChange (value) {
    var temp = value.split(',')
    this.setState({ localeValue: temp })
  }
  createPoll () {
    var isListValue = false
    if (this.state.listSelected.length > 0) {
      isListValue = true
    }
    var options = []
    if (this.state.title === '' || this.state.categoryValue.length === 0 || this.state.option1 === '' || this.state.option2 === '' ||
      this.state.option3 === '' || this.state.statement === '') {
      this.setState({alert: true})
    } else {
      if (this.state.option1 !== '') {
        options.push(this.state.option1)
      }
      if (this.state.option2 !== '') {
        options.push(this.state.option2)
      }
      if (this.state.option3 !== '') {
        options.push(this.state.option3)
      }
      var isSegmentedValue = false
      if (this.state.pageValue.length > 0 || this.state.genderValue.length > 0 ||
                    this.state.localeValue.length > 0) {
        isSegmentedValue = true
      }
      this.props.addPoll('', {
        platform: 'Facebook',
        datetime: Date.now(),
        statement: this.state.statement,
        sent: 0,
        options: options,
        isSegmented: isSegmentedValue,
        segmentationPageIds: this.state.pageValue,
        segmentationGender: this.state.genderValue,
        segmentationLocale: this.state.localeValue,
        isList: isListValue,
        segmentationList: this.state.listSelected
      })
    }
  }

  updateStatment (e) {
    this.setState({statement: e.target.value})
  }
  updateTitle (e) {
    this.setState({title: e.target.value})
  }
  updateOptions (e, opt) {
    switch (opt) {
      case 1:
        this.setState({option1: e.target.value})
        break
      case 2:
        this.setState({option2: e.target.value})
        break
      case 3:
        this.setState({option3: e.target.value})
        break

      default:
        break
    }
  }
  handleRadioButton (e) {
    this.setState({
      selectedRadio: e.currentTarget.value
    })
    if (e.currentTarget.value === 'list') {
      this.setState({genderValue: [], localeValue: []})
    } if (e.currentTarget.value === 'segmentation') {
      this.setState({listSelected: [], isList: false})
    }
  }
  goToSend () {
    var isListValue = false
    if (this.state.listSelected.length > 0) {
      isListValue = true
    }
    var options = []
    if (this.state.option1 === '' || this.state.option2 === '' ||
      this.state.option3 === '' || this.state.statement === '') {
      this.setState({alert: true})
    } else {
      if (this.state.option1 !== '') {
        options.push(this.state.option1)
      }
      if (this.state.option2 !== '') {
        options.push(this.state.option2)
      }
      if (this.state.option3 !== '') {
        options.push(this.state.option3)
      }
      var isSegmentedValue = false
      if (this.state.pageValue.length > 0 || this.state.genderValue.length > 0 ||
                    this.state.localeValue.length > 0) {
        isSegmentedValue = true
      }
      var res = checkConditions(this.state.pageValue, this.state.genderValue, this.state.localeValue, this.props.subscribers)
      if (res === false) {
        this.msg.error('No subscribers match the selected criteria')
      } else {
        this.props.sendPollDirectly({
          platform: 'Facebook',
          datetime: Date.now(),
          statement: this.state.statement,
          sent: 0,
          options: options,
          isSegmented: isSegmentedValue,
          segmentationPageIds: this.state.pageValue,
          segmentationGender: this.state.genderValue,
          segmentationLocale: this.state.localeValue,
          isList: isListValue,
          segmentationList: this.state.listSelected
        }, this.msg)
      }
    }
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
        <AlertContainer ref={a => { this.msg = a }} {...alertOptions} />
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <Sidebar />
          <div className='m-grid__item m-grid__item--fluid m-wrapper'>
            <div className='m-subheader '>
              <div className='d-flex align-items-center'>
                <div className='mr-auto'>
                  <h3 className='m-subheader__title'>Create Template Poll</h3>
                </div>
              </div>
            </div>
            <div className='m-content'>

              <div className='row'>
                <div className='col-lg-8 col-md-8 col-sm-4 col-xs-12'>
                  <div className='m-portlet' style={{height: '100%'}}>
                    <div className='m-portlet__head'>
                      <div className='m-portlet__head-caption'>
                        <div className='m-portlet__head-title'>
                          <h3 className='m-portlet__head-text'>
                          Ask Facebook Subscribers a Question
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='m-portlet__body'>
                      <div className='row align-items-center'>
                        <div className='col-xl-8 order-2 order-xl-1' />
                        <div className='col-xl-4 order-1 order-xl-2 m--align-right'>
                          {
                            this.state.isShowingModal &&
                            <ModalContainer style={{width: '500px'}}
                              onClose={this.closeDialog}>
                              <ModalDialog style={{width: '500px'}}
                                onClose={this.closeDialog}>
                                <p>Do you want to send this poll right away or save it for later use? </p>
                                <div style={{width: '100%', textAlign: 'center'}}>
                                  <div style={{display: 'inline-block', padding: '5px'}}>
                                    <button className='btn btn-primary' onClick={() => {
                                      this.closeDialog()
                                      this.goToSend()
                                    }}>
                                      Send
                                    </button>
                                  </div>
                                  <div style={{display: 'inline-block', padding: '5px'}}>
                                    <button className='btn btn-primary' onClick={() => {
                                      this.createPoll()
                                      this.props.history.push({
                                        pathname: '/poll'
                                      })
                                    }}>
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </ModalDialog>
                            </ModalContainer>
                          }
                        </div>
                      </div>
                      <div className='m-form'>
                        <div id='question' className='form-group m-form__group'>
                          <label className='control-label'>Ask something...</label>
                          <textarea className='form-control'
                            value={this.state.statement}
                            onChange={(e) => this.updateStatment(e)} />
                        </div>
                        <div style={{top: '10px'}}>
                          <label className='control-label'> Add 3 responses</label>
                          <fieldset className='input-group-vertical'>
                            <div id='responses' className='form-group m-form__group'>
                              <label className='sr-only'>Response1</label>
                              <input type='text' className='form-control'
                                value={this.state.option1}
                                onChange={(e) => this.updateOptions(e, 1)}
                                placeholder='Response 1' maxLength='20' />
                            </div>
                            <div className='form-group m-form__group'>
                              <label className='sr-only'>Response2</label>
                              <input type='text' className='form-control'
                                value={this.state.option2}
                                onChange={(e) => this.updateOptions(e, 2)}
                                placeholder='Response 2' maxLength='20' />
                            </div>
                            <div className='form-group m-form__group'>
                              <label className='sr-only'>Response3</label>
                              <input type='text' className='form-control'
                                value={this.state.option3}
                                onChange={(e) => this.updateOptions(e, 3)}
                                placeholder='Response 3' maxLength='20' />
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      { this.state.alert &&
                        <center>
                          <Alert type='danger' style={{marginTop: '30px'}}>
                            You have either left one or more responses empty or you
                            have not asked anything. Please ask something and fill all
                            three responses in order to create the poll.
                          </Alert>
                        </center>
                      }
                    </div>
                    <div className='m-portlet__foot m-portlet__foot--fit' style={{'overflow': 'auto'}}>
                      <div className='m-form__actions' style={{'float': 'right', 'marginTop': '25px', 'marginRight': '20px'}}>
                        <button className='btn btn-primary'
                          onClick={this.showDialog}> Save
                        </button>
                        <Link
                          to='/showTemplatePolls'
                          className='btn btn-secondary' style={{'margin-left': '10px'}}>
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='target' className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                  <div className='m-portlet' style={{height: '100%'}}>
                    <div className='m-portlet__head'>
                      <div className='m-portlet__head-caption'>
                        <div className='m-portlet__head-title'>
                          <h3 className='m-portlet__head-text'>
                          Targeting
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='m-portlet__body'>
                      <label>Select Page:</label>
                      <div className='form-group m-form__group'>
                        <select id='selectPage' style={{minWidth: 75 + '%'}} />
                      </div>
                      <label>Select Segmentation:</label>
                      <div className='radio-buttons' style={{marginLeft: '20px'}}>
                        <div className='radio'>
                          <input id='segmentAll'
                            type='radio'
                            value='segmentation'
                            name='segmentationType'
                            onChange={this.handleRadioButton}
                            checked={this.state.selectedRadio === 'segmentation'} />
                          <label>Apply Basic Segmentation</label>
                          { this.state.selectedRadio === 'segmentation'
                          ? <div className='m-form'>
                            <div className='form-group m-form__group' style={{marginTop: '10px'}}>
                              <select id='selectGender' style={{minWidth: 75 + '%'}} />
                            </div>
                            <div className='form-group m-form__group' style={{marginTop: '-18px'}}>
                              <select id='selectLocale' style={{minWidth: 75 + '%'}} />
                            </div>
                          </div>
                          : <div className='m-form'>
                            <div className='form-group m-form__group' style={{marginTop: '10px'}}>
                              <select id='selectGender' style={{minWidth: 75 + '%'}} disabled />
                            </div>
                            <div className='form-group m-form__group' style={{marginTop: '-18px'}}>
                              <select id='selectLocale' style={{minWidth: 75 + '%'}} disabled />
                            </div>
                          </div>
                          }
                        </div>
                        { this.state.lists.length === 0
                        ? <div className='radio' style={{marginTop: '10px'}}>
                          <input id='segmentList'
                            type='radio'
                            value='list'
                            name='segmentationType'
                            disabled />
                          <label>Use Segmented Subscribers List</label>
                          <div style={{marginLeft: '20px'}}><Link to='/segmentedLists' style={{color: '#5867dd', cursor: 'pointer', fontSize: 'small'}}> See Segmentation Here</Link></div>
                        </div>
                        : <div className='radio'>
                          <input id='segmentList'
                            type='radio'
                            value='list'
                            name='segmentationType'
                            onChange={this.handleRadioButton}
                            checked={this.state.selectedRadio === 'list'} />
                          <label>Use Segmented Subscribers List</label>
                          <div style={{marginLeft: '20px'}}><Link to='/segmentedLists' style={{color: '#5867dd', cursor: 'pointer', fontSize: 'small'}}> See Segmentation Here</Link></div>
                        </div>
                        }
                        <div className='m-form'>
                          { this.state.selectedRadio === 'list'
                          ? <div className='form-group m-form__group'><select id='selectLists' /></div>
                          : <div className='form-group m-form__group'><select id='selectLists' disabled /></div>
                          }
                        </div>
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
    pages: (state.pagesInfo.pages),
    pollCreated: (state.pollsInfo.pollCreated),
    user: (state.basicInfo.user),
    pollDetails: (state.templatesInfo.pollDetails),
    currentPoll: (state.backdoorInfo.currentPoll),
    customerLists: (state.listsInfo.customerLists),
    subscribers: (state.subscribersInfo.subscribers)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addPoll: addPoll,
    loadPollDetails: loadPollDetails,
    getuserdetails: getuserdetails,
    loadCustomerLists: loadCustomerLists,
    sendpoll: sendpoll,
    loadSubscribersList: loadSubscribersList,
    sendPollDirectly: sendPollDirectly
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPoll)