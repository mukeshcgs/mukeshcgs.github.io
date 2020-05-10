import React, { Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import {Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"


import Navbar from './Navbar';
import Header from './Header';
import MyWork from './MyWork';

export default class Dashboard extends Component {
    render() {
        return (<div class="container theme-showcase" role="main">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                </div>
        )
    }
}


