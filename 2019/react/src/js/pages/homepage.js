import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"
import { Motion, spring } from 'react-motion';

class HomePage extends Component {
  render() {
    return (<div class="home-container">
      {/* <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1000) }}>
        {value => <div>{value.x}</div>}
      </Motion> */}
      <div class="my-name">
          <h1>mukesh thankar<span>.</span></h1>
        <p>designer<span>|</span>developer</p>
        {/* <p>mukeshcgs<span>@</span>gmail.com</p> */}
      </div>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dispatch)
}

export default connect(mapDispatchToProps)(HomePage);


