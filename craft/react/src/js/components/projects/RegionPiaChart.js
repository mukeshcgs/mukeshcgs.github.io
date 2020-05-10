import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"

import { TweenMax, Power2, TimelineLite } from "gsap";
import LoadingSpinner from '../loadingSpinner'

class RegionPiaChart extends Component {
    constructor(props) {
        super(props);
        this.state = {disAmount: 5}
      }
    avrRegionsBars(data) {
        if (data.pages.regions) {
            let dd = Object.values(data.pages.regions);
            let xyz = [];
            let reqView = "tested";
            for (var i = 0; i < this.state.disAmount; i++) {
                var rmd = Math.floor((Math.random() * 100) + 1)
                let a = dd[i].total_cases
                let b = 100
                let c = data.pages.summary.total_cases
                let avr = Math.round((a * b) / c)

                xyz.push(<div class="avr" key={i} style={{ height: 250, width: 250 }}>
                    <div style={{ height: 5 * (avr), width: 5 * avr }}>
                        <span className="c-per">{avr}%</span>
                    </div>
                        <span className="c-name">{dd[i].name}</span>
                </div>);
            }
            return data.pages.regions ? xyz : < LoadingSpinner />
        }
    }

    render() {
        const { disAmount } = this.state;

        return (<div class="project-list-container" >
            <div class="page-heading">Virus cases by country</div>
            <p>Increase in cases over past 24 hours — top {disAmount} countries</p>
            <section className="graph pai-chart">
                {this.avrRegionsBars(this.props.pages)}
            </section>
        </div>)
    }
}

RegionPiaChart.PropTypes = { pages: React.PropTypes.array.isRequired, };

function mapStateToProps(state) { return { pages: state.pages } }

export default connect(mapStateToProps)(RegionPiaChart);



