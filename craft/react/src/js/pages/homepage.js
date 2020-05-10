import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"
import { Motion, spring } from 'react-motion';

class HomePage extends Component {
  latestSummery(data) {
    if (data.pages.summary) {
      return (<div id="result">
        <div class="cases"><span class="count">{data.pages.summary.total_cases}</span><span>Total Cases</span></div>
        <div class="recovered"><span class="count">{data.pages.summary.active_cases}</span><span>Active Cases</span></div>
        <div class="deaths"><span class="count">{data.pages.summary.recovered}</span><span>Recovered</span></div>
        <div class="deaths"><span class="count">{data.pages.summary.deaths}</span><span>Deaths</span></div>
      </div>)
    } else {
      return (<div>NO</div>)
    }
  }
  render() {
    return (<div class="home-container">
      {/* <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1000) }}>
        {value => <div>{value.x}</div>}
      </Motion> */}
      <div class="my-name">
        <h1>COVID<span>-</span>19</h1>
        <p>Global Data Dashboard</p>
        {/* <p>mukeshcgs<span>@</span>gmail.com</p> */}
      </div>
      {this.latestSummery(this.props.pages)}

    </div>)
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(dispatch)
// }

// export default connect(mapDispatchToProps)(HomePage);

// function mapStateToProps(state) {
//   return {pages: state.pages}
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({},dispatch)
// }
//  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

HomePage.PropTypes = {
  pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages,
  }
}

export default connect(mapStateToProps)(HomePage);