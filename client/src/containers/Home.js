import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>num</h1>
          <p>App for mental calculation</p>

          {/* TODO: when quiz page is ready, link to that instead of /report. */}
          <Link to='/report'>Report Mock</Link>

          <p>
            <a href="/quiz/multiply_double_digits">Multiply questions</a>
          </p>
        </div>
      </div>
    );
  }
}
