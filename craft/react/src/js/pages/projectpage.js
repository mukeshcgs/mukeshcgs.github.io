import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"
//Animation Lib
import { TweenMax, Power2, TimelineLite } from "gsap";

class ProjectPage extends Component {
    componentDidMount() {
        //getProject(this.props.match.params.slug);
    }
    createTechnologiesList(list) {
        console.log("list");
        console.log(list);
        return list.map((tect, index) => <li key={index}>{tect}</li>)
    }
    createProjectTypeList(projectType) {
        console.log("projectType");
        console.log(projectType);
        return projectType.map((projectType, index) => <li key={index}>{projectType}</li>)
    }

    createListItems() {
        //console.log("Clicked ID :: " + this.props.match.params.slug);
        //console.log(this.props.pages.pages[0].slug);

        if (this.props.match.params.slug) {
            var map = {}
            let projectParm = this.props.match.params
            for (var i = 0; i < this.props.pages.pages.length; i++) {
                map[this.props.pages.pages[i].slug] = this.props.pages.pages[i]
            }
            console.log(map);
            //console.log(map[projectParm.slug].slug)

            return <div class="page-container">
                <div class="page-heading">project page</div>
                {/* <div class="pro-header-container" style={{ backgroundImage: `url(${map[projectParm.slug].acf.project_image_desktop})` }}>
                    <div class="page-container pro-header">
                        <h1 class="" >
                            {map[projectParm.slug].title.rendered}
                        </h1>
                        <div><a target="_blank" class="view-proj-btn" href={map[projectParm.slug].acf.url}> See it in action </a></div>
                    </div>
                </div>
                <div class="pro-details">
                    <h1>{map[projectParm.slug].acf.project_name}</h1>
                    <p>{map[projectParm.slug].acf.project_breif}</p>
                    <p>{map[projectParm.slug].acf.project_time}</p>
                    <p>{map[projectParm.slug].acf.slugea}</p>

                    <ul class="technologies">{this.createTechnologiesList(map[projectParm.slug].acf.technologies)}</ul>
                    <ul class="project-type">{this.createProjectTypeList(map[projectParm.slug].acf.project_type)}</ul>
                </div>

                <div class="pro-images">
                    <div class="desktop-img">
                        <img class="img-responsive" src={map[projectParm.slug].acf.project_image_desktop} />
                    </div>
                    <div class="tab-img">
                        <img class="img-responsive" src={map[projectParm.slug].acf.project_image_tab} />
                    </div>
                    <div class="mob-img">
                        <img class="img-responsive" src={map[projectParm.slug].acf.project_image_mobile} />
                    </div>
                </div> */}
            </div >
        } else {
            return (<p>No Project data found</p>)
        }
    }

    render() {
        return (this.createListItems())
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dispatch)
}

//export default connect(mapDispatchToProps)(ProjectPage);

ProjectPage.PropTypes = {
    pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        pages: state.pages
    }
}

export default connect(mapStateToProps)(ProjectPage);