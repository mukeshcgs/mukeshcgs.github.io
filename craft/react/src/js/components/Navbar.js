import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"
import { TimelineLite, CSSPlugin } from "gsap/all";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logoContainer = null;
    this.logoTween = null;
  }
  componentDidMount() {
    this.logoTween = new TimelineLite({ paused: false }).from(this.logoContainer, 1, { y: -50, alpha: 0 })
  }
  componantDidUpdate(nextProps) {
    if (nextProps.pages.pages) { }
  }

  componantDidUpdate() { }

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

    return (<div class="navigation" ref={ss => this.logoContainer = ss}>

      <ul>
        <li>
          <Link to={"/home"} >Home</Link>
        </li>
        {/* <li>
          <Link to={"/me"} >ME</Link>
        </li> */}

        <li>
          <Link to={"/statistics"} >Stats</Link>
        </li>
        <li>
          <Link to={"/information"} >Information</Link>
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