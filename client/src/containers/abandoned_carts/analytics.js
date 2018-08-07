/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Analytics extends React.Component {
  render () {
    return ( 
    <div className="row">
    <div className='col-sm-8'>
      <div className='m-portlet m-portlet--full-height m-portlet--skin-light m-portlet--fit'>
        <div className='m-portlet__head'>
          <div className='m-portlet__head-caption'>
            <div className='m-portlet__head-title'>
              <h3 className='m-portlet__head-text substring-dashboard'>
                Store Name
              </h3>
            </div>
          </div>
        </div>
        <div className='m-portlet__body'>
          <div className='m-widget21'>
            <div className='row'>
              <div className='col-xl-4'>
                  <div className='m-widget21__item'>
                    <span className='m-widget21__icon'>
                      <a className='btn btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                         <i className='la la-shopping-cart  m--font-light' />
                       </a>
                    </span>
                    <div className='m-widget21__info'>
                      <span className='m-widget21__title'>
                         {25}
                       </span>
                      <br />
                      <span className='m-widget21__sub'>
                          Abandoned Carts
                        </span>
                    </div>
                  </div>
              </div>
              <div className='col-xl-4'>
                  <div className='m-widget21__item'>
                    <span className='m-widget21__icon'>
                      <a className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                         <i className='fa flaticon-cart m--font-light' />
                       </a>
                    </span>
                    <div className='m-widget21__info'>
                      <span className='m-widget21__title'>
                         {450}
                       </span>
                      <br />
                      <span className='m-widget21__sub'>
                          Purchased Carts
                        </span>
                    </div>
                  </div>
              </div>
              <div className='col-xl-4'>
                  <div className='m-widget21__item'>
                    <span className='m-widget21__icon'>
                      <a className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                         <i className='la la-money  m--font-light' />
                       </a>
                    </span>
                    <div className='m-widget21__info'>
                      <span className='m-widget21__title'>
                         $800
                       </span>
                      <br />
                      <span className='m-widget21__sub'>
                          Extra Sales
                        </span>
                    </div>
                  </div>
              </div>
            </div>
            <div className='m--space-30' />
            <div className='m-widget15'>
              <div className='m-widget15__item'>
                <span style={{fontSize: '1.1rem', fontWeight: '600', color: '#6f727d'}}>
                  {25}
                </span>
                <span style={{fontSize: '0.85rem', float: 'right', marginTop: '0.3rem', color: '#9699a2'}}>
                    Followers converted into Subscribers
                  </span>
                <div className='m--space-10' />
                <div className='progress m-progress--sm' style={{height: '6px'}}>
                  <div className='progress-bar bg-success' role='progressbar' style={{width: 100}} aria-valuenow={25} aria-valuemin='0' aria-valuemax='100' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-sm-4">
      <div className='m-portlet m-portlet--half-height m-portlet--border-bottom-danger'>
        <div className='m-portlet__body'>
          <div className='m-widget26'>
            <div className='m-widget26__number'>
              0
              <small>
                Shopify Subscribers
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className='m-portlet m-portlet--half-height m-portlet--border-bottom-danger'>
        <div className='m-portlet__body'>
          <div className='m-widget26'>
            <div className='m-widget26__number'>
              0
              <small>
                Push Sent
              </small>
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
  console.log('state', state)
  return {
    storeList: (state.abandonedInfo.storeList),
    isLoading: (state.abandonedInfo.isLoading)
    // user: (state.basicInfo.user),
    // bots: (state.botsInfo.bots),
    // count: (state.botsInfo.count),
    // analytics: (state.botsInfo.analytics)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
    },
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
