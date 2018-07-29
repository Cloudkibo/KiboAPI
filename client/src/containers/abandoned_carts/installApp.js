/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadMyPagesList } from '../../redux/actions/pages.actions'
import { installShopifyApp } from '../../redux/actions/abandonedCarts.actions'
import AlertContainer from 'react-alert'
import auth from './../../utility/auth.service'
class InstallApp extends React.Component {
  constructor () {
    super()
    this.state = {
      pageUrl: '',
      selectedPage: ''
    }
  }

  componenWillReceiveProps (nextProps) {
    if (nextProps.pages && this.state.selectedPage === '' && nextProps.pages.length > 0) {
      this.setState({selectedPage: nextProps.pages[0].pageId})
    }
  }

  componentDidMount () {
    if (this.props.pages && this.state.selectedPage === '' && this.props.pages.length > 0) {
      this.setState({selectedPage: this.props.pages[0].pageId})
    }
  }

  install (event) {
    if (this.state.pageUrl === '' || this.state.selectedPage === '') {
      return this.msg.error('Please enter a valid url and select a page')
    }
    console.log('Calling install shopify app')
    this.props.installShopifyApp(this.state.pageUrl, this.state.selectedPage)
  }

  selectPage (event) {
    this.setState({selectedPage: event.target.value})
  }

  render () {
    console.log('Selected Page', this.state.selectedPage)
    const alertOptions = {
      offset: 75,
      position: 'bottom right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <div className='m-content'>
          <AlertContainer ref={a => { this.msg = a }} {...alertOptions} />
          <div className='row'>
            <div className='col-xl-12'>
              <div style={{margin: 150 + 'px', textAlign: 'center'}}>
                <h1> KiboPush </h1>
                <h1> Install Shopify App </h1>
                <br />
                <form method='post' action={ '/api/shopify?access_token=' + auth.getToken() }>
                <input autoFocus className='form-control m-input' type='text' placeholder='Shop Url e.g. mystore.myshopify.com' ref='domain' required
                  style={{ WebkitBoxShadow: 'none', boxShadow: 'none', height: '45px' }}
                  value={this.state.pageUrl} name="shop" onChange={(event) => { this.setState({pageUrl: event.target.value}) }} />
                <br />
                <select style={{height: '45px', width: 80 + '%'}} onChange={this.selectPage.bind(this)} name="pageId">
                  { (this.props.pages)
                    ? this.props.pages.map((page) => {
                      return <option value={page.pageId} key={page._id}> {page.pageName} </option>
                    }) : <option>No Pages Found</option>
                  }
                </select>
                <br />
                <br />
                <button type='submit' className='btn  btn-success btn-lg' style={{marginTop: 25 + 'px'}}>Install</button>
                </ form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state', state)
  return {
    pages: (state.pagesInfo.pages),
    user: (state.basicInfo.user),
    bots: (state.botsInfo.bots),
    count: (state.botsInfo.count),
    analytics: (state.botsInfo.analytics)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      loadMyPagesList: loadMyPagesList,
      installShopifyApp: installShopifyApp
    },
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(InstallApp)
