import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"

class Navbar extends Component {
  componantDidMount() {
    ///this.props.getpages();
  }
  createListItems(data) {
    return data.pages.filter(page => {
      return page.parent === 0
    }).map((page, i) => {
      return (<li class="fade-in" key={page.id}>
        <Link to={"/" + page.slug} >{page.slug}</Link>
      </li>)
    })
  }
  render() {
    //Creating SVG
    const vertices = [[0, 20], [10, 0], [20, 20]]
    const vertices2 = [[10, 20], [20, 0], [30, 20]]
    function Triangle({ vertices, color }) {
      const pathData = [
        'M', vertices[0][0], vertices[0][1],
        'L', vertices[1][0], vertices[1][1],
        'L', vertices[2][0], vertices[2][1],
        'Z',
      ].join(' ');
      return (<path d={pathData} fill={color} />)
    };

    return (<div class="navigation">
      
      <ul>
        <li>
          <Link to={"/home"} >HOME</Link>
        </li>
        <li>
          <Link to={"/me"} >ME</Link>
        </li>
        <li>
          <svg class="svg-logo" width="40" height="20">
          <Triangle vertices={vertices} color="#0084ff" />
          <Triangle vertices={vertices2} color="#FFFFFF" />
        </svg>
        </li>
        <li>
          <Link to={"/projects"} >projects</Link>
        </li>
        <li>
          <Link to={"/say-hi"} >Information</Link>
        </li>
      </ul>
      {/* <ul >{this.createListItems(this.props.pages)}</ul> */}
    </div>)
  }
}


Navbar.PropTypes = {
  pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages
  }
}

export default connect(mapStateToProps)(Navbar);