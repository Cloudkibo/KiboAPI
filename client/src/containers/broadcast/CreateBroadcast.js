/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react';
import Sidebar from '../sidebar/sidebar';
import Responsive from '../sidebar/responsive';
import Dashboard from '../dashboard/dashboard';
import Header from '../header/header';
import HeaderResponsive from '../header/headerResponsive';

class CreateBroadcast extends React.Component {
  render() {
    return (
	<div>
      <Header/>
      <HeaderResponsive />
      <Sidebar/>
      <Responsive/>
     

      <div className="container">
      						   	 <br/>
							     <br/>
							     <br/>
						      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						        <h2 className="presentation-margin">Send a Message to Facebook Subscribers</h2>
						        <div className="ui-block">
						          <div className="news-feed-form">
						            
						            <div className="tab-content">
						              <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
						                <form>
						                  
						                  <div className="form-group with-icon label-floating is-empty">
						                    <label className="control-label">Say something...</label>
						                    <textarea className="form-control"/>
						                  </div>
						                  <div className="add-options-message">
						                    <a href="#" className="options-message" data-toggle="modal" data-target="#update-header-photo" data-placement="top" title data-original-title="ADD PHOTOS">
						                   		<i className="fa fa-image"></i>
						                   		<span>Add Image</span>
						                    </a>
						                    <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" title data-original-title="TAG YOUR FRIENDS">
						                    <i className="fa fa-video-camera"></i>
						                   		<span>Add Video</span>
						                    </a>
						                    <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" title data-original-title="ADD LOCATION">
						                    <i className="fa fa-link"></i>
						                   		<span>Add Link</span>
						                    </a>
						                    <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" title data-original-title="ADD LOCATION">
						                    <i className="fa fa-volume-up"></i>
						                   		<span>Add Audio</span>
						                    </a>
						                    <button className="btn btn-primary btn-md-2"> Send Broadcast</button>
						                    <button className="btn btn-md-2 btn-border-think btn-transparent c-grey">Cancel</button>
						                  </div>
						                </form>
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

export default CreateBroadcast;