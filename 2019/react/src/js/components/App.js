import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import HomePage from '../pages/homepage';
import AboutMePage from '../pages/aboutmepage';
import ProjectsPage from '../pages/projectspage';
import ProjectPage from '../pages/projectpage';
import ContactPage from '../pages/contactpage';
import PageNotFound from '../pages/PageNotFound'
import browserHistory from 'react-router-dom'
import AboutPage from '../pages/aboutpage';
import Table from '../pages/table';

import { getPages } from "../actions/pages/pagesAction";
class App extends React.Component {
  componantDidMount() {
    //this.props.getPages();
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
  render() {
    const { pages, isFetching } = this.props;
    if (isFetching) {
      return (<h1>Loading....</h1>)
    }
    return <Router history={browserHistory}>
      <div>
        {/*<Navbar/>*/}
        <Sidebar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/home" component={HomePage} exact />
          <Route path="/me" component={AboutMePage} exact />
          <Route path="/projects" component={ProjectsPage} exact projects={this.props.projects} />
          <Route path="/:slug" component={ProjectPage} />
          <Route path="/say-hi" component={ContactPage} exact />
          <Route path="*" component={PageNotFound} />

          {this.buildRoutes(this.props.pages)}
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  }
}
App.PropTypes = {
  pages: React.PropTypes.array.isRequired,
  getPages: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pages: state.pages
  }
}

export default connect(mapStateToProps, getPages)(App);