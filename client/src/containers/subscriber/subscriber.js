/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Responsive from '../../components/sidebar/responsive'
import Header from '../../components/header/header'
import HeaderResponsive from '../../components/header/headerResponsive'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadSubscribersList } from '../../redux/actions/subscribers.actions'
import { bindActionCreators } from 'redux'
import ReactPaginate from 'react-paginate'

class Subscriber extends React.Component {
  constructor (props, context) {
    super(props, context)
    props.loadSubscribersList()
    this.state = {
      subscribersData: [],
      subscribersDataAll: [],
      totalLength: 0,
      filterByGender: '',
      filterByLocale: ''
    }
    this.displayData = this.displayData.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.searchSubscriber = this.searchSubscriber.bind(this)
    this.handleFilterByGender = this.handleFilterByGender.bind(this)
    this.handleFilterByLocale = this.handleFilterByLocale.bind(this)
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
    document.title = 'KiboPush | Subscribers'
  }

  searchSubscriber (event) {
    var filtered = []
    for (let i = 0; i < this.props.subscribers.length; i++) {
      if (this.props.subscribers[i].firstName.toLowerCase().includes(event.target.value) || this.props.subscribers[i].lastName.toLowerCase().includes(event.target.value)) {
        filtered.push(this.props.subscribers[i])
      }
    }
    this.displayData(0, filtered)
    this.setState({ totalLength: filtered.length })
  }

  displayData (n, subscribers) {
    console.log(subscribers)
    let offset = n * 4
    let data = []
    let limit
    let index = 0
    if ((offset + 4) > subscribers.length) {
      limit = subscribers.length
    } else {
      limit = offset + 4
    }
    for (var i = offset; i < limit; i++) {
      data[index] = subscribers[i]
      index++
    }
    this.setState({subscribersData: data, subscribersDataAll: subscribers})
  }

  handlePageClick (data) {
    this.displayData(data.selected, this.state.subscribersDataAll)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps is called')
    if (nextProps.subscribers) {
      console.log('Broadcasts Updated', nextProps.subscribers)
      this.displayData(0, nextProps.subscribers)
      this.setState({ totalLength: nextProps.subscribers.length })
    }
  }

  handleFilterByGender (e) {
    var filtered = []
    this.setState({filterByGender: e.target.value})
    if (this.state.filterByLocale !== '') {
      if (e.target.value === '') {
        for (var k = 0; k < this.props.subscribers.length; k++) {
          if (this.props.subscribers[k].locale === this.state.filterByLocale) {
            filtered.push(this.props.subscribers[k])
          }
        }
      } else {
        for (var i = 0; i < this.props.subscribers.length; i++) {
          if (this.props.subscribers[i].gender === e.target.value && this.props.subscribers[i].locale === this.state.filterByLocale) {
            filtered.push(this.props.subscribers[i])
          }
        }
      }
    } else {
      if (e.target.value === '') {
        filtered = this.props.subscribers
      } else {
        for (var j = 0; j < this.props.subscribers.length; j++) {
          if (this.props.subscribers[j].gender === e.target.value) {
            filtered.push(this.props.subscribers[j])
          }
        }
      }
    }
    this.displayData(0, filtered)
    this.setState({ totalLength: filtered.length })
  }

  handleFilterByLocale (e) {
    var filtered = []
    this.setState({filterByLocale: e.target.value})
    if (this.state.filterByGender !== '') {
      if (e.target.value === '') {
        for (var k = 0; k < this.props.subscribers.length; k++) {
          if (this.props.subscribers[k].gender === this.state.filterByGender) {
            filtered.push(this.props.subscribers[k])
          }
        }
      } else {
        for (var i = 0; i < this.props.subscribers.length; i++) {
          if (this.props.subscribers[i].locale === e.target.value && this.props.subscribers[i].gender === this.state.filterByGender) {
            filtered.push(this.props.subscribers[i])
          }
        }
      }
    } else {
      if (e.target.value === '') {
        filtered = this.props.subscribers
      } else {
        for (var j = 0; j < this.props.subscribers.length; j++) {
          if (this.props.subscribers[j].locale === e.target.value) {
            filtered.push(this.props.subscribers[j])
          }
        }
      }
    }
    this.displayData(0, filtered)
    this.setState({ totalLength: filtered.length })
  }

  render () {
    console.log('Subscriber Data', this.state.subscribersData)

    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <Sidebar />
          <div className='m-grid__item m-grid__item--fluid m-wrapper'>
            <div className='m-subheader '>
              <div className='d-flex align-items-center'>
                <div className='mr-auto'>
                  <h3 className='m-subheader__title'>Manage Subscribers</h3>
                </div>
              </div>
            </div>
            <div className='m-content'>
              <div className='row'>
                <div className='col-xl-12 col-lg-12  col-md-12 col-sm-12 col-xs-12'>
                  <div className='m-portlet m-portlet--mobile'>
                    <div className='m-portlet__head'>
                      <div className='m-portlet__head-caption'>
                        <div className='m-portlet__head-title'>
                          <h3 className='m-portlet__head-text'>
                            Page Subscribers
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className='m-portlet__body'>

                      <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                        <div className='row align-items-center'>
                          <div className='col-xl-8 order-2 order-xl-1'>
                            <div className='form-group m-form__group row align-items-center'>
                              <div className='col-md-4'>
                                <div className='m-form__group m-form__group--inline'>
                                  <div className='m-form__label'>
                                    <label>Gender:</label>
                                  </div>
                                  <div className='m-form__control'>
                                    <div className='btn-group bootstrap-select form-control m-bootstrap-select m-bootstrap-select--solid dropup'><button type='button' className='btn dropdown-toggle bs-placeholder btn-default' data-toggle='dropdown' role='button' data-id='m_form_status' title='All' aria-expanded='false'><span className='filter-option pull-left'>All</span>&nbsp;<span className='bs-caret'><span className='caret' /></span></button><div className='dropdown-menu open' role='combobox' x-placement='bottom-start'><ul className='dropdown-menu inner' role='listbox' aria-expanded='false'><li data-original-index='0' className='selected'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='true'><span className='text'>All</span><span className='glyphicon glyphicon-ok check-mark' /></a></li><li data-original-index='1'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='false'><span className='text'>Pending</span><span className='glyphicon glyphicon-ok check-mark' /></a></li><li data-original-index='2'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='false'><span className='text'>Delivered</span><span className='glyphicon glyphicon-ok check-mark' /></a></li><li data-original-index='3'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='false'><span className='text'>Canceled</span><span className='glyphicon glyphicon-ok check-mark' /></a></li></ul>
                                    </div>
                                      <select className='form-control m-bootstrap-select m-bootstrap-select--solid' id='m_form_status' tabindex='-98'>
                                        <option value=''>All</option>
                                        <option value='1'>Pending</option>
                                        <option value='2'>Delivered</option>
                                        <option value='3'>Canceled</option>
                                      </select></div>
                                  </div>
                                </div>
                                <div className='d-md-none m--margin-bottom-10' />
                              </div>
                              <div className='col-md-4'>
                                <div className='m-form__group m-form__group--inline'>
                                  <div className='m-form__label'>
                                    <label className='m-label m-label--single'>Local:</label>
                                  </div>
                                  <div className='m-form__control'>
                                    <div className='btn-group bootstrap-select form-control m-bootstrap-select m-bootstrap-select--solid'>
                                      <button type='button' className='btn dropdown-toggle bs-placeholder btn-default' data-toggle='dropdown' role='button' data-id='m_form_type' title='All'><span className='filter-option pull-left'>All</span>&nbsp;<span className='bs-caret'><span className='caret' /></span></button>
                                      <div className='dropdown-menu open' role='combobox'>
                                        <ul className='dropdown-menu inner' role='listbox' aria-expanded='false'><li data-original-index='0' className='selected'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='true'><span className='text'>All</span><span className='glyphicon glyphicon-ok check-mark' /></a></li><li data-original-index='1'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='false'><span className='text'>Online</span><span className='glyphicon glyphicon-ok check-mark' /></a></li><li data-original-index='2'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='false'><span className='text'>Retail</span><span className='glyphicon glyphicon-ok check-mark' /></a></li><li data-original-index='3'><a tabindex='0' className='' data-tokens='null' role='option' aria-disabled='false' aria-selected='false'><span className='text'>Direct</span><span className='glyphicon glyphicon-ok check-mark' /></a></li></ul></div><select className='form-control m-bootstrap-select m-bootstrap-select--solid' id='m_form_type' tabindex='-98'>
                                          <option value=''>All</option>
                                          <option value='1'>Online</option>
                                          <option value='2'>Retail</option>
                                          <option value='3'>Direct</option>
                                        </select></div>
                                  </div>
                                </div>
                                <div className='d-md-none m--margin-bottom-10' />
                              </div>
                              <div className='col-md-4'>
                                <div className='m-input-icon m-input-icon--left'>
                                  <input type='text' className='form-control m-input m-input--solid' placeholder='Search...' id='generalSearch' />
                                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                                    <span><i className='la la-search' /></span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-4 order-1 order-xl-2 m--align-right'>
                            <Link to='/invitesubscribers' className='btn btn-focus m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill'>
                              <span>
                                <i className='la la-cart-plus' />
                                <span>Invite Subscribers</span>
                              </span>
                            </Link>
                            <div className='m-separator m-separator--dashed d-xl-none' />
                          </div>
                        </div>
                      </div>

                      { this.props.subscribers && this.props.subscribers.length > 0
                  ? <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded'>
                    {
                      this.state.subscribersData && this.state.subscribersData.length > 0
                      ? <div>
                        <table className='m-datatable__table'>
                          <thead className='m-datatable__head'>
                            <tr className="m-datatable__row">
                              <th className="m-datatable__cell--center m-datatable__cell m-datatable__cell--sort">Profile Picture</th>
                              <th className="m-datatable__cell--center m-datatable__cell m-datatable__cell--sort">Name</th>
                              <th className="m-datatable__cell--center m-datatable__cell m-datatable__cell--sort">Page</th>
                              <th className="m-datatable__cell--center m-datatable__cell m-datatable__cell--sort">Locale</th>
                              <th className="m-datatable__cell--center m-datatable__cell m-datatable__cell--sort">Gender</th>
                            </tr>
                          </thead>
                          <tbody className="m-datatable__body">
                            {
                              this.state.subscribersData.map((subscriber, i) => (
                                <tr className="m-datatable__row m-datatable__row--even">
                                  <td className="m-datatable__cell--center m-datatable__cell">
                                    <img alt='pic'
                                      src={(subscriber.profilePic) ? subscriber.profilePic : ''}
                                      className='img-circle' width='60' height='60'
                                    />
                                  </td>
                                  <td className="m-datatable__cell--center m-datatable__cell">{subscriber.firstName} {subscriber.lastName}</td>
                                  <td className="m-datatable__cell--center m-datatable__cell">{subscriber.pageId.pageName}</td>
                                  <td className="m-datatable__cell--center m-datatable__cell">{subscriber.locale}</td>
                                  <td className="m-datatable__cell--center m-datatable__cell">{subscriber.gender}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                        <ReactPaginate previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={<a>...</a>}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(this.state.totalLength / 4)}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={3}
                          onPageChange={this.handlePageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'} />
                      </div>
                      : <p> No search results found. </p>
                    }
                  </div>
                  : <div className='table-responsive'>
                    <p> No data to display </p>
                  </div>
                }
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
  console.log(state)
  return {
    subscribers: (state.subscribersInfo.subscribers),
    locales: (state.subscribersInfo.locales)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({loadSubscribersList: loadSubscribersList},
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Subscriber)
