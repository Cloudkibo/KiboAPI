import React from 'react'
import ReactPaginate from 'react-paginate'
import { loadBroadcastsByDays } from '../../redux/actions/backdoor.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleDate } from '../../utility/utils'
import { browserHistory } from 'react-router'

class BroadcastsInfo extends React.Component {
  constructor (props, context) {
    super(props, context)
    props.loadBroadcastsByDays({last_id: 'none', number_of_records: 10, first_page: true, filter: true, filter_criteria: {search_value: '', days: 10}})
    this.state = {
      BroadcastData: [],
      totalLength: 0,
      filterOptions: [
        { value: 10, label: '10 days' },
        { value: 30, label: '30 days' }],
      selectedFilterValue: 10,
      selectedDays: 10,
      searchValue: '',
      filter: true,
      pageNumber: 0
    }
    this.displayData = this.displayData.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.searchBroadcasts = this.searchBroadcasts.bind(this)
    this.onBroadcastClick = this.onBroadcastClick.bind(this)
    this.onDaysChange = this.onDaysChange.bind(this)
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

  displayData (n, broadcasts) {
    let offset = n * 10
    let data = []
    let limit
    let index = 0
    if ((offset + 10) > broadcasts.length) {
      limit = broadcasts.length
    } else {
      limit = offset + 10
    }
    for (var i = offset; i < limit; i++) {
      data[index] = broadcasts[i]
      index++
    }
    this.setState({BroadcastData: data})
  }

  handlePageClick (data) {
    this.setState({pageNumber: data.selected})
    if (data.selected === 0) {
      this.props.loadBroadcastsByDays({last_id: 'none', number_of_records: 10, first_page: true, filter: this.state.filter, filter_criteria: {search_value: this.state.searchValue, days: this.state.selectedDays}})
    } else {
      this.props.loadBroadcastsByDays({last_id: this.props.broadcasts.length > 0 ? this.props.broadcasts[this.props.broadcasts.length - 1]._id : 'none', number_of_records: 10, first_page: false, filter: this.state.filter, filter_criteria: {search_value: this.state.searchValue, days: this.state.selectedDays}})
    }
    this.displayData(data.selected, this.props.broadcasts)
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps in broadcastbydays', nextProps)
    if (nextProps.broadcasts && nextProps.count) {
      this.displayData(0, nextProps.broadcasts)
      this.setState({ totalLength: nextProps.count })
    } else {
      this.setState({BroadcastData: [], totalLength: 0})
    }
  }
  searchBroadcasts (event) {
    this.setState({searchValue: event.target.value.toLowerCase()})
    if (event.target.value !== '') {
      this.setState({filter: true})
      this.props.loadBroadcastsByDays({last_id: this.props.broadcasts.length > 0 ? this.props.broadcasts[this.props.broadcasts.length - 1]._id : 'none', number_of_records: 10, first_page: true, filter: true, filter_criteria: {search_value: event.target.value.toLowerCase(), days: this.state.selectedDays}})
    } else {
      this.props.loadBroadcastsByDays({last_id: this.props.broadcasts.length > 0 ? this.props.broadcasts[this.props.broadcasts.length - 1]._id : 'none', number_of_records: 10, first_page: true, filter: this.state.filter, filter_criteria: {search_value: '', days: this.state.selectedDays}})
    }
  }
  onDaysChange (event) {
    this.setState({selectedDays: event.target.value, pageNumber: 0})
    if (event.target.value !== '') {
      this.setState({filter: true})
      this.props.loadBroadcastsByDays({last_id: this.props.broadcasts.length > 0 ? this.props.broadcasts[this.props.broadcasts.length - 1]._id : 'none', number_of_records: 10, first_page: true, filter: true, filter_criteria: {search_value: this.state.searchValue, days: event.target.value}})
    }
    // var defaultVal = 10
    // var value = e.target.value
    // this.setState({selectedDays: value})
    // if (value && value !== '') {
    //   if (value.indexOf('.') !== -1) {
    //     value = Math.floor(value)
    //   }
    //   this.props.loadBroadcastsByDays(value)
    // } else if (value === '') {
    //   this.setState({selectedDays: defaultVal})
    //   this.props.loadBroadcastsByDays(defaultVal)
    // }
  }
  onBroadcastClick (broadcast) {
    browserHistory.push({
      pathname: `/viewBroadcastDetail`,
      state: {title: broadcast.title, payload: broadcast.payload, data: broadcast}
    })
  }

  render () {
    return (
      <div className='row'>
        <div
          className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
          <div className='m-portlet m-portlet--mobile'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                    Broadcasts
                  </h3>
                </div>
              </div>
              <div className='m-portlet__head-tools'>
                <ul className='nav nav-pills nav-pills--brand m-nav-pills--align-right m-nav-pills--btn-pill m-nav-pills--btn-sm' role='tablist'>
                  <li className='nav-item m-tabs__item' />
                  <li className='nav-item m-tabs__item' />
                  <li className='nav-item m-tabs__item'>
                    <form className='m-form m-form--fit m-form--label-align-right'>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-text-input' className='col-form-label'>
                          Show records for last:&nbsp;&nbsp;
                        </label>
                        <div>
                          <input id='example-text-input' type='number' min='0' step='1' value={this.state.selectedDays} className='form-control' onChange={this.onDaysChange} />
                        </div>
                        <label htmlFor='example-text-input' className='col-form-label'>
                        &nbsp;&nbsp;days
                      </label>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
            <div className='m-portlet__body'>
              <div className='row align-items-center'> <div className='col-lg-12 col-md-12 order-2 order-xl-1'>
                <div className='form-group m-form__group row align-items-center'>
                  <div className='m-input-icon m-input-icon--left col-md-4 col-lg-4 col-xl-4' style={{marginLeft: '15px'}}>
                    <input type='text' placeholder='Search by Title...' className='form-control m-input m-input--solid' onChange={this.searchBroadcasts} />
                    <span className='m-input-icon__icon m-input-icon__icon--left'>
                      <span><i className='la la-search' /></span>
                    </span>
                  </div>
                </div>
                {
                  this.state.BroadcastData && this.state.BroadcastData.length > 0
                  ? <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded' id='ajax_data'>
                    <table className='m-datatable__table'
                      id='m-datatable--27866229129' style={{
                        display: 'block',
                        height: 'auto',
                        overflowX: 'auto'
                      }}>
                      <thead className='m-datatable__head'>
                        <tr className='m-datatable__row'
                          style={{height: '53px'}}>
                          <th data-field='title'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}}>Title</span></th>
                          <th data-field='user'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}}>User/Company Name</span></th>
                          <th data-field='page'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}}>Page</span></th>
                          <th data-field='created'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}}>Created At</span></th>
                          <th data-field='sent'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}}>Sent</span></th>
                          <th data-field='seen'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}}>Seen</span></th>
                          <th data-field='more'
                            className='m-datatable__cell--center m-datatable__cell m-datatable__cell--sort'>
                            <span style={{width: '120px'}} /></th>
                        </tr>
                      </thead>
                      <tbody className='m-datatable__body' style={{textAlign: 'center'}}>
                        {
                          this.state.BroadcastData.map((broadcast, i) => (
                            <tr data-row={i}
                              className='m-datatable__row m-datatable__row--even'
                              style={{height: '55px'}} key={i}>
                              <td data-field='title'
                                className='m-datatable__cell'>
                                <span
                                  style={{width: '120px'}}>{broadcast.title}</span></td>
                              { (broadcast.user[0].plan === 'plan_A' || broadcast.user[0].plan === 'plan_B')
                            ? <td data-field='user' className='m-datatable__cell'>
                              <span style={{width: '120px'}}>{broadcast.user[0].name}</span></td>
                              : <td data-field='user' className='m-datatable__cell'>
                                <span style={{width: '120px'}}>{broadcast.company[0].companyName}</span></td>}
                              <td data-field='page' className='m-datatable__cell'>
                                <span style={{width: '120px'}}>{broadcast.page.join(',')}</span></td>
                              <td data-field='created'
                                className='m-datatable__cell'>
                                <span
                                  style={{width: '120px'}}>{handleDate(broadcast.datetime)}</span></td>
                              <td data-field='sent'
                                className='m-datatable__cell'>
                                <span
                                  style={{width: '120px'}}>{broadcast.sent}</span></td>
                              <td data-field='seen'
                                className='m-datatable__cell'>
                                <span
                                  style={{width: '120px'}}>{broadcast.seen}</span></td>
                              <td data-field='more'
                                className='m-datatable__cell'>
                                <span
                                  style={{width: '120px'}}>
                                  <button onClick={() => this.onBroadcastClick(broadcast)} className='btn btn-primary btn-sm' style={{float: 'left', margin: 2}}>
                                  View
                                </button></span>
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
                      pageCount={Math.ceil(this.state.totalLength / 10)}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                      forcePage={this.state.pageNumber} />
                  </div>
                  : <p> No data to display. </p>
                }
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
    broadcasts: state.backdoorInfo.broadcasts,
    count: state.backdoorInfo.broadcastsCount
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {loadBroadcastsByDays: loadBroadcastsByDays}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BroadcastsInfo)
