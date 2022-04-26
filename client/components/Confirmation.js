import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class Confirmation extends React.Component {
  render() {
    let orderNum = Math.floor(Math.random() * 10000000000000)

    return (
      <div className="confirmation-page">
        <h1>
          Thank you for your order!
        </h1>
        <h2>We proudly serve the best of best when it comes to pictures of bread stapled to trees. Thank you for believing in us and supporting our profound mission</h2>
        <h3>{`Order Number: #${orderNum}`}</h3>
        <Link to='/'>Back to Home</Link>
      </div>
    );
  }
}

export default connect()(Confirmation);
