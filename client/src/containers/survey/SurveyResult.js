/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../sidebar/sidebar';
import Responsive from '../sidebar/responsive';
import Header from '../header/header';
import HeaderResponsive from '../header/headerResponsive';
import { showSurveyResponse } from '../../redux/actions/surveys.actions';
import Response from './Response';

class SurveyResult extends React.Component {

  componentDidMount() {
		require('../../../public/js/jquery-3.2.0.min.js');
		require('../../../public/js/jquery.min.js');
		let addScript = document.createElement('script');
		addScript.setAttribute('src', '../../../js/theme-plugins.js');
		document.body.appendChild(addScript);
		addScript = document.createElement('script');
		addScript.setAttribute('src', '../../../js/material.min.js');
		document.body.appendChild(addScript);
		addScript = document.createElement('script');
		addScript.setAttribute('src', '../../../js/main.js');
		document.body.appendChild(addScript);
    this.props.showSurveyResponse();
	}

  render() {
    return (
      <div>
        <Header />
        <HeaderResponsive />
        <Sidebar />
        <Responsive />
        <div className="container">
          <br /><br /><br />
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h3 className="presentation-margin">Survey Report</h3>
              <div className="container">
                <br />
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="ui-block">
                      <div className="ui-block-content">
                        <ul className="statistics-list-count">
                          <li>
                            <div className="points">
                              <span>
                                Survey Sent
                              </span>
                            </div>
                            <div className="count-stat">36
                              <span className="indicator positive"> + 5</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="ui-block">
                      <div className="ui-block-content">
                        <ul className="statistics-list-count">
                          <li>
                            <div className="points">
                              <span>
                                Survey Response
                              </span>
                            </div>
                            <div className="count-stat">333
                              <span className="indicator negative"> - 10</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-sm-12 col-xs-12">
                    <div className="ui-block responsive-flex">
                      <div className="ui-block-title">
                        <div className="h6 title">Survey Questions</div>
                      </div>
                      <div className="ui-block-content">
                        <ul className='list-group'>
                          {
                            this.props.responses && this.props.responses.questions.map((c) => (
                              <div className='card'>
                              <li
                                className='list-group-item'
                                style={{ cursor: 'pointer' }}
                                key={c._id}
                              >
                                <strong>{c.statement}</strong>
                              </li>
                              <Response responses={this.props.responses} question={c} />
                              </div>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { responses } = state.surveysInfo;
  return {
    responses,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showSurveyResponse }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyResult);