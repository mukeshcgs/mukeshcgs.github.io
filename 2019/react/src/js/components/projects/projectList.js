import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"

import { TweenMax, Power2, TimelineLite } from "gsap";
import LoadingSpinner from '../loadingSpinner'

class ProjectList extends Component {

    createListItems() {
        return this.props.pages.pages.length ? (this.props.pages.pages.filter(project => { return project.parent === 33 }).map((project, index) => < li class="fade-in" key={project.id} style={{ backgroundImage: `url(${project.acf.project_image_desktop})` }}>
            {project.parent == 33 && < Link to={"/" + project.slug} > < span > {index} </span> {project.slug}</Link >}
        </li>
        )) : < LoadingSpinner />
    }

    render() {
        return (<div class="project-list-container" > <ul class="project-list" > {this.createListItems()} </ul> </div>)
    }
}

ProjectList.PropTypes = { pages: React.PropTypes.array.isRequired, };

function mapStateToProps(state) { return { pages: state.pages } }

export default connect(mapStateToProps)(ProjectList);