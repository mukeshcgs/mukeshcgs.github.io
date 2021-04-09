import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from "react-redux"
import { Link, Route } from "react-router-dom"
import ReactDOM from "react-dom"

export default class Footer extends Component {
  render() {
    return (<footer>
      <ul>
        <li><a class="" href="mailto:mukeshcgs@gmail.com">mukeshcgs@gmail.com</a></li>
        {/* <li><a class="fb" href="facebook.com"></a></li>
        <li><a class="tw" href="twitter.com"></a></li>
        <li><a class="gm" href="gmail.com"></a></li> */}
      </ul>
    </footer>)
  }
}


