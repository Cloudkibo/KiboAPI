/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
// var handleDate = function (d) {
//   var c = new Date(d)
//   return c.toDateString()
// }

class SubmitSurvey extends React.Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <h2 className='presentation-margin'>Thank you.</h2>
            <p>Response recorded successfully.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default (SubmitSurvey)
