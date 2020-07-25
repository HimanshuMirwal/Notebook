import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserComponentsCss/middleTop.css";

function MiddleTop() {
  return (
    <div>
      <div className="row row-div row-padding" >
        <div className="col container col-div">
          <h1 className="heading-middle-col">Come and Get the books for free</h1>
          <div className="quote-middle-div">
          <p className="quote-middle">
          “Don’t take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.”
          </p>
            <h3>Dr. APJ Abdul Kalam</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleTop;
