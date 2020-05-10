import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"
import LoadingSpinner from '../components/loadingSpinner'

class AboutMePage extends Component {
    createProjectTypeList(projectType) {
        return projectType.map((projectType, index) => <span key={index}>{projectType}</span>)
    }

    createFreelanceListItems() {
        return this.props.pages.pages.length ? (this.props.pages.pages.filter(project => { return project.parent === 33 }).map((project, index) => < li class="fade-in" key={project.id} style={{ color: `${project.acf.primary_color}` }}>
            {project.parent == 33 && <span class="skill-name">{project.acf.project_name}</span>}
            {project.parent == 33 && <span class="skill-type">{this.createProjectTypeList(project.acf.project_type)}</span>}
            {project.parent == 33 && <span class="skill-time">{project.acf.project_time}</span>}
        </li>
        )) : < LoadingSpinner />
    }

    createSkills(project) {
        return project.map((skill, index) => <span key={index}>{skill}</span>)
    }

    createSkillTypeList() {
        return this.props.pages.pages.length ? (this.props.pages.pages.filter(project => { return project.slug === "me" }).map((project, index) => < li class="fade-in" key={project.id} >
            {project.slug === "me" && <span class="skill-name">{this.createSkills(project.acf.skill)}</span>}
        </li>
        )) : < LoadingSpinner />
    }
    aboutsection() {
        return this.props.pages.pages.length ? (this.props.pages.pages.filter(project => { return project.slug === "me" }).map((project, index) => < div key={project.id} >
            {project.slug === "me" && <h2>{project.acf.about_heading}</h2>}
            <img class="my-img" src={project.acf.profile_picture} />
            {project.slug === "me" && <p>{project.acf.about_content}</p>}
        </div>
        )) : < LoadingSpinner />
    }
    render() {
        return (<div class="page-container">
            <div class="page-heading">
                about Me
            </div>
            <div class="about-details">
                <div>
                    {this.aboutsection()}
                </div>

                <div class="work-exp-block">
                    <h4>Skills</h4>
                    <ul class="skills skill">
                        {this.createSkillTypeList()}
                    </ul>

                    <h4>Freelance Work</h4>
                    <ul class="skills freelance">
                        {this.createFreelanceListItems()}
                    </ul>

                </div>
            </div>
        </div >)
    }
}
AboutMePage.PropTypes = { pages: PropTypes.array.isRequired, };

function mapStateToProps(state) { return { pages: state.pages } }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(dispatch)
// }
export default connect(mapStateToProps)(AboutMePage);