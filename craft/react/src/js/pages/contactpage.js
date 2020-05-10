import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"

class ContactPage extends Component {
    render() {
        return (<div class="page-container">
            <div class="page-heading">Information</div>

            <div class="about-details">
                <p>
                    The horrific Covid–19 pandemic is affecting the whole world — some countries far worse than others. This dashboard has been created for public information purposes, visualising the key data, limited to the 16 worst affected countries at any given time. It is not intended to be a comprehensive report, nor does it offer any opinion or comment. It is a simple snapshot — designed to be informative, user-friendly and easy to digest.
        
            </p>
                <p>
                    The data is sourced from a number of reliable sources* and updated daily whenever possible. The website is coded using liquid, javascript, html and css — no external libraries or plugins are used to generate the charts.
            </p>

            </div>
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dispatch)
}

export default connect(mapDispatchToProps)(ContactPage);


