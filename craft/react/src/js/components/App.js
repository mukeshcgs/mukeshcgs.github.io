import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/footer';
import { bindActionCreators } from 'redux'

import HomePage from '../pages/homepage';
import AboutMePage from '../pages/aboutmepage';
import ProjectsPage from '../pages/projectspage';
import ProjectPage from '../pages/projectpage';
import ContactPage from '../pages/contactpage';
import PageNotFound from '../pages/PageNotFound'
import browserHistory from 'react-router-dom'
import AboutPage from '../pages/aboutpage';
import Table from '../pages/table';
import { TimelineLite, CSSPlugin } from "gsap/all";


import { getPages, getRegionData } from "../actions/pages/pagesAction";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectValue: "Country" };
    this.handleChange = this.handleChange.bind(this);

  }



  averagesRegion(data) {
    if (data.pages.regions) {
      let ss = Object.keys(data.pages.regions);
      return ss.map((region, i) => {
        return (<option key={i}>{region}</option>)
      })
    }
  }
  latestRegions(data) {
    if (data.pages.regions) {
      let ss = Object.keys(data.pages.regions);
      return ss.map((region, i) => {
        return (<option key={i}>{region}</option>)
      })
    }
  }

  buildRoutes(data) {
    return data.pages.map((page, i) => {
      return (
        <Route
          key={i}
          component={data.pages.slug}
          path={`/${page.slug}`}
          exact
        />
      )
    })
  }

  handleChange(e) {
    this.setState({ selectValue: e.target.value });
    //this.props.getRegionData({ selectValue: e.target.value });
  }

  render() {
    const { pages, isFetching } = this.props;
    const { selectValue } = this.state;

    console.log("PROPS", this.props.pages);

    if (isFetching) {
      return (<h1>Loading....</h1>)
    }
    var message = 'You selected :' + selectValue;

    return <Router history={browserHistory}>
      <div id="mukesh" >
        <Navbar ref={ img => this.logoContainer = img } />
        {/* <Sidebar /> */}
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/home" component={HomePage} exact />
          {/* <Route path="/me" component={AboutMePage} exact /> */}
          <Route path="/statistics" component={ProjectsPage} exact projects={this.props.pages} />
          {/* <Route path="/:slug" component={ProjectPage} /> */}
          <Route path="/information" component={ContactPage} exact />
          {/* <Route path="*" component={PageNotFound} /> */}
          {/* {this.buildRoutes(this.props.pages)} */}
        </Switch>
        {/* <Footer /> */}
        {/* {this.props.pages.summary.total_cases} */}

        {/* <select
          value={selectValue}
          onChange={this.handleChange}
          >
          <option value="">{selectValue}</option>
          {this.latestRegions(this.props.pages)}
          </select>
        <p>{message}</p> */}


        {/* {this.latestSummery(this.props.pages)} */}
      </div>
    </Router>
  }
}

App.PropTypes = {
  pages: PropTypes.array.isRequired,
  getPages: PropTypes.func.isRequired,
  // getRegionData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { pages: state.pages }
}

export default connect(mapStateToProps, getPages)(App);

// function mapStateToProps(state) {
//   return { pages: state.pages }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);