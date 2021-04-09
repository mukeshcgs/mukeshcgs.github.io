import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    //this._toggle = this._toggle.bind(this)
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
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
      <svg class="svg-logo" width="40" height="20">
        <Triangle vertices={vertices} color="#0084ff" />
        <Triangle vertices={vertices2} color="#FFFFFF" />
      </svg>
      <ul >{this.createListItems(this.props.pages)}</ul>
    </div>)
  }
}

Navbar.PropTypes = {
  pages: React.PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages
  }
}

export default connect(mapStateToProps)(Navbar);