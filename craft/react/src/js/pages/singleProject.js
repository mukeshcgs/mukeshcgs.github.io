import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"

import { TweenMax, Power2, TimelineLite } from "gsap";

class SingleProject extends Component {
    createListItems() {
        console.log("Mukesh " + this.props.projectIndex);

        if (!this.props.projectIndex === undefined) {
            return <div>
                <p>No Events Found</p>
                {this.props.projectIndex}
                {/* {this.props.projects.projects} */}
            </div>
        }

        console.log("ddd");
        return (<p>

            Child

            </p>)
    }

    render() {
        return (<div>
            <ul>{this.createListItems()}</ul>
            <hr />
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dispatch)
}

export default connect(mapDispatchToProps)(SingleProject);
