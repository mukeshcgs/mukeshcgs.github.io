import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"
import { TweenMax, Power2, TimelineLite } from "gsap";
import LoadingSpinner from '../loadingSpinner'

class RegionTable extends Component {
    constructor(props) {
        super(props);
        this.state = { disAmount: 10 }
    }
    regionsTable(data) {
        if (data.pages.regions) {
            let dd = Object.values(data.pages.regions);
            let xyz = [];
            for (var i = 0; i < this.state.disAmount; i++) {
                xyz.push(<div class="info-row" key={i}>
                    <div> {dd[i].name} </div>
                    <div> {dd[i].total_cases} </div>
                    <div> {dd[i].tested} </div>
                    <div> {dd[i].recovered} </div>
                    <div> {dd[i].deaths} </div>
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
            <section class="region-tbl">
                <div className="info-tbl">
                    <div class="info-row head">
                        <div>Country</div>
                        <div>Total Cases</div>
                        <div>Tested</div>
                        <div>Recovered</div>
                        <div>Deaths</div>
                    </div>
                    {this.regionsTable(this.props.pages)}
                </div>
            </section>
        </div>)
    }
}

RegionTable.PropTypes = { pages: PropTypes.array.isRequired, };

function mapStateToProps(state) { return { pages: state.pages } }

export default connect(mapStateToProps)(RegionTable);



