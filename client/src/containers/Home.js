import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>num+</h1>
          <p>App for mental calculation</p>
          <p>
            <a href="/quiz/multiply_double_digits">Multiply module</a>
          </p>
        </div>
      </div>
    );
  }
}
