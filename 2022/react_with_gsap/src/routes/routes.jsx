import React, { useRef } from "react";
import { TransitionGroup, Transition } from "react-transition-group";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import HomeNew from "../pages/HomeNew";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import { gsap } from "gsap";

const completeCall = (target, parent) => {
  gsap.set(target, { clearProps: "position, width" });
  parent && gsap.set(parent, { clearProps: "overflow" });
};

const Routes = (props) => {
  const parentNode = useRef(null);

  const onEnterHandler = (node) => {
    gsap.killTweensOf(node);
    // Set initial position and styles
    gsap.set(node, {
      // position: "absolute", 
      left: 0,
      y: 50, 
      autoAlpha: 0
    });
    gsap.set(parentNode.current, { overflow: "hidden" })
    // Create the animation for the incoming component
    gsap.to(node, {
      duration: 0.5, 
      autoAlpha: 1,
      y: 0,
      onComplete: completeCall,
      onCompleteParams: [node, parentNode.current]
    });
  };

  const onExitHandler = (node) => {
    gsap.killTweensOf(node);
    // Set initial position and styles
    gsap.set(node, {
      // position: "absolute", 
      left: 0,
      y: 0,
    });
    // Create the animation for the incoming component
    gsap.to(node, {
      duration:0.5, 
      autoAlpha: 0,
      y: -50
    });
  };

  return (
    <div className="">
      <Header className="" />
      <div
        className="relative "
        ref={parentNode}
        style={{
          height: "calc(100vh - 56px)"
        }}
      >
        <TransitionGroup component={null}>
          <Transition
            timeout={1000}
            key={props.location.pathname}
            onEnter={onEnterHandler}
            onExit={onExitHandler}
          >
            <Switch location={props.location}>
              <Route path="/" exact>
                <HomeNew />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route>
                <Error />
              </Route>
            </Switch>
          </Transition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Routes;
