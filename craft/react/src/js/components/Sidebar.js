import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"

//Animation Libraryes
import { Motion, spring, StaggeredMotion } from 'react-motion';

class Sidebar extends Component {
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
    //Toggole Function
    // _toggle() {
    //     this.setState((prevState) => {
    //         return {
    //             isOn: !prevState.isOn
    //         }
    //     })
    // }
    componantDidMount() {
    }
    createListItems(data) {
        return data.pages.filter(page => {
            return page.parent === 0
        }).map((page, i) => {
            return (<li class="fade-in" key={page.id}>
                <Link onClick={this.handleClick} class={this.state.isToggleOn ? ' ' : 'active'} to={"/" + page.slug} >{page.slug}</Link>
            </li>)
        })
    }
    render() {
        //const value = this.state.isOn ? 1 : 0
        return (<div class="sidebar-container">
            <div class="navigation">
                <div class="logo">
                <Link to={"/"} >
                    <svg class="svg-logo" width="55" height="30"><path d="M 0 30 L 15 0 L 30 30 Z" fill="#0084ff"></path><path d="M 15 30 L 30 0 L 45 30 Z" fill="#FFFFFF"></path></svg>
                </Link>
                </div>

                <div id="threeLines" onClick={this.handleClick} class={this.state.isToggleOn ? ' ' : 'active'} >
                    <button id="el" ></button>
                </div>
            </div>

            <div id="sidebar" class={this.state.isToggleOn ? 'closed' : 'open'} >
                <ul class="sidebar-nav">
                    {/* {this.createListItems(this.props.pages)} */}
                </ul>
            </div>
        </div>)
    }
}

Sidebar.PropTypes = {
    pages: PropTypes.array.isRequired,
    _toggle: PropTypes.func.isRequired

};

function mapStateToProps(state) {
    return {
        pages: state.pages,
    }
}

export default connect(mapStateToProps)(Sidebar);