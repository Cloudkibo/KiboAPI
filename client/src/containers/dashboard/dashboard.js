
/* eslint-disable no-return-assign */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Dashboard extends React.Component {
  render () {
    return (
      <div>Hello</div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state', state)
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
    },
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
