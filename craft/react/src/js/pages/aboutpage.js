import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"
import axios from 'axios'

import { getProjects } from "../actions/projects/ProjectActions";
import ProjectPage from "./projectpage";

class AboutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            projectIndex: 0
        }
        this._TogglePrev = this._TogglePrev.bind(this);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
        this._ToggleNext = this._ToggleNext.bind(this);
    }

    componentDidMount() {
        // axios.get('http://localhost/www/react-wordpress/wp-json/wp/v2/posts')
        // .then((result)=> {
        //     console.log(result.data.payload);
        //     var projects = result.data.payload
        //     this.setState({
        //         projects: projects,
        //         selectedIndex: 0
        //     });
        // })
    }

    componentWillUnmount() {
        //this.serverRequest.abort()
    }

    _ToggleNext() {
        if (this.state.selectedIndex == this.props.projects.projects.length - 1)
            return;
        this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex + 1
        }))
        console.log(this.props.projects.projects[this.state.selectedIndex]);
        console.log("::::NEXT::::" + this.props.projects.projects[this.state.selectedIndex].id);
    }

    _TogglePrev() {
        if (this.state.selectedIndex == 0)
            return;
        this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex - 1
        }))
        console.log(this.state.selectedIndex);
        //console.log("selectedVideo:" + this.state.selectedVideo);
        //console.log("::::PREV::::" + this.props.projects.projects[this.state.selectedIndex].id);
    }

    render() {
        let { selectedIndex, projects } = this.state;
        return (
            <div>
                {/* <ProjectPage projectIndex={this.state.selectedIndex} /> */}
                <ProjectPage projectIndex={this.props.projects.projects[selectedIndex]} />
                <div className="controls">
                    <button className="toggle toggle--prev" onClick={this._TogglePrev}>Prev</button>
                    <button className="toggle toggle--next" onClick={this._ToggleNext}>Next</button>
                </div>
                <h4>Video Index::{this.state.selectedIndex}</h4>
                <h4>Project:</h4>{}
            </div>
        )
    }
}
AboutPage.PropTypes = {
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired,
    projectIndex: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        pages: state.pages,
        projects: state.projects
    }
}

export default connect(mapStateToProps, getProjects)(AboutPage);