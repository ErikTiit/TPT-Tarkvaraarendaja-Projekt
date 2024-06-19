import React from 'react';
import { Link } from 'react-router-dom';

export default function SwitchButton() {
  return (
    <div>
      <Link to="/">homepage</Link>
      
      <Link to="/business-offer">businessform</Link>
      
      <Link to="/student-register">STUDENTREG</Link>
    </div>
  );
}