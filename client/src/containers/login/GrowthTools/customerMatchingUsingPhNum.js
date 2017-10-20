import React from 'react'
import Files from 'react-files'
import Sidebar from '../../components/sidebar/sidebar'
import Responsive from '../../components/sidebar/responsive'
import Header from '../../components/header/header'
import HeaderResponsive from '../../components/header/headerResponsive'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { saveFileForPhoneNumbers } from '../../redux/actions/growthTools.actions'
import { Alert } from 'react-bs-notifier'

class CustomerMatching extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      file: '',
      textAreaValue: '',
      fileErrors: [],
      messageErrors: [],
      alertMessage: '',
      type: '',
      disabled: false
    }

    this.onTextChange = this.onTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.onFilesChange = this.onFilesChange.bind(this)
    this.onFilesError = this.onFilesError.bind(this)
    this.clickAlert = this.clickAlert.bind(this)
  }
  clickAlert (e) {
    e.preventDefault()
    this.setState({
      file: '',
      textAreaValue: '',
      fileErrors: [],
      messageErrors: [],
      alertMessage: '',
      type: '',
      disabled: false
    })
  }

  onFilesChange (files) {
    this.setState({
      file: files,
      fileErrors: []
    })
    console.log(this.state.file[0])
  }

  onFilesError (error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
    this.setState({
      fileErrors: [{errorMsg: error.message}]
    })
  }
 /* global FormData */
  handleSubmit () {
    var file = this.state.file
    if (file && file !== '') {
      var fileData = new FormData()
      fileData.append('file', file[0])
      fileData.append('filename', file[0].name)
      fileData.append('filetype', file[0].type)
      fileData.append('filesize', file[0].size)
      fileData.append('text', this.state.textAreaValue)
    }

    if (this.validate()) {
      this.props.saveFileForPhoneNumbers(fileData)
    }
  }

  onTextChange (e) {
    this.setState({textAreaValue: e.target.value})
    if (e.target.value) {
      this.setState({messageErrors: []})
    } else {
      this.setState({
        messageErrors: [{errorMsg: 'Enter an invitation message'}]
      })
    }
  }

  validate () {
    var errors = false
    console.log('validate', this.state)
    if (this.state.file === '') {
      this.setState({
        fileErrors: [{errorMsg: 'Upload a file'}]
      })
      errors = true
    }
    if (this.state.textAreaValue === '' && this.state.textAreaValue.length < 1) {
      this.setState({
        messageErrors: [{errorMsg: 'Enter an invitation message'}]
      })
      errors = true
    }
    return !errors
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps is called', nextProps)
    var res = nextProps.uploadResponse.fileUploadResponse
    if (res.status === 'failed') {
      this.setState({
        alertMessage: (`${res.status} : ${res.description}`),
        type: 'danger',
        disabled: true
      })
    } else if (res.status === 'success') {
      this.setState({
        alertMessage: ('Your file has been uploaded successfully.'),
        type: 'success',
        disabled: true
      })
    } else {
      this.setState({
        alertMessage: '',
        type: '',
        disabled: false
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
            <main
              className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
              <div className='ui-block'>
                <div className='birthday-item inline-items badges'>
                  <h3>Customer Matching Using Phone Numbers</h3>
                  <br />
                  <h7>Upload a file with '.csv', '.xls' or '.xlsx' extension containing phone numbers
                    of your customers to invite them for a chat on messenger.
                    The
                    file should contain columns 'names' and 'phone_numbers'
                    The columns should contain the list all the customers&#39; name and phone
                    numbers respectively. An invitation message will be sent on Facebook messenger
                    to all the customers listed using their phone numbers.
                  </h7>
                  <div
                    className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12 dropzone'>
                    <Files
                      className='file-upload-area'
                      onChange={this.onFilesChange}
                      onError={this.onFilesError}
                      accepts={[
                        'text/comma-separated-values',
                        'text/csv',
                        'application/csv',
                        '.csv',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.ms-excel']}
                      multiple={false}
                      maxFileSize={25000000}
                      minFileSize={0}
                      clickable>
                      <div className='align-center'>
                        <img src='icons/file.png' alt='Text'
                          style={{maxHeight: 40}} />
                        <h4>Upload here</h4>
                        <p>Try dropping some files here, or click to select a
                          file to upload. Only '.csv', '.xlsx', '.xls' files are accepted</p>
                        <h4>{this.state.file !== ''
                          ? this.state.file[0].name
                          : ''}</h4>
                      </div>
                    </Files>
                    <div className='row'>
                      <div
                        className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
                        <label>File Selected</label>
                        <input type='text' disabled='true'
                          value={this.state.file
                                   ? this.state.file[0].name
                                   : ''} style={{width: '50%'}} />
                        <div
                          className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12 text-help'
                          style={{color: 'red'}}>
                          {
                              this.state.fileErrors.map(
                                f => <span>{f.errorMsg}</span>)
                            }
                        </div>
                      </div>
                      <div
                        className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
                        <textarea className='textArea'
                          placeholder='Enter Invitation Message'
                          value={this.state.textAreaValue}
                          onChange={this.onTextChange} />
                        <div
                          className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12 text-help'
                          style={{color: 'red'}}>
                          {
                              this.state.messageErrors.map(
                                m => <span>{m.errorMsg}</span>)
                            }
                        </div>
                        <div
                          className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
                          { this.state.disabled
                          ? <button onClick={this.handleSubmit}
                            className='btn btn-primary' disabled >Submit
                          </button>
                          : <button onClick={this.handleSubmit}
                            className='btn btn-primary' >Submit
                          </button>
                        }
                        </div>
                        {
                          this.state.alertMessage !== '' &&
                            <Alert type={this.state.type}>
                              {this.state.alertMessage} <br />
                              <a href='#' className='alert-link' onClick={this.clickAlert}>Click here to select another file</a>
                            </Alert>
                        }
                      </div>
                    </div>
                  </div>
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
  console.log('in mapStateToProps', state)
  return {
    uploadResponse: state.getFileUploadResponse
    // uploadResponse: {status :'success'}
    // uploadResponse: {status :'failed' , description: 'Some problem'}
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({saveFileForPhoneNumbers: saveFileForPhoneNumbers},
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerMatching)