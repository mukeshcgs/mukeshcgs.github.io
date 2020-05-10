import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"
import { Motion, spring } from 'react-motion';
import { TimelineMax } from "gsap";
import { TimelineLite, CSSPlugin } from "gsap/all";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.logoContainer = null;
    this.logoTween = null;
  }

  componentDidMount() {
    this.logoTween = new TimelineLite({ paused: false }).from(this.logoContainer, 1, { y: 50, alpha:0 })
    
  }
  componantDidUpdate(nextProps) {if(nextProps.pages.pages){}}

  componantDidUpdate() {}

  latestSummery(data) {
    if (data.pages.summary) {
      return (<div id="result"  >
        <div class="cases"><span class="count">{data.pages.summary.total_cases}</span><span>Total Cases</span></div>
        <div class="recovered"><span class="count">{data.pages.summary.active_cases}</span><span>Active Cases</span></div>
        <div class="deaths"><span class="count">{data.pages.summary.recovered}</span><span>Recovered</span></div>
        <div class="deaths"><span class="count">{data.pages.summary.deaths}</span><span>Deaths</span></div>
      </div>)
    } else {
      return (<div>...</div>)
    }
  }

  render() {
    return (<div class="home-container">
      {/* <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1000) }}>
        {value => <div>{value.x}</div>}
      </Motion> */}
      <div class="my-name" ref={ss => this.logoContainer = ss}>
        <h1>COVID<span>-</span>19</h1>
        <p>A data visualisation project</p>
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