import React from "react";
import "./App.css";
const Test = () => {
  return (
    // <div className="cardcontent">
    //   <div className="row">
    //     <div className="column">
    //       <div className="card">
    //         <h3>Card 1</h3>
    //         <p>Some text</p>
    //         <p>Some text</p>
    //       </div>
    //     </div>

    //     <div className="column">
    //       <div className="card">
    //         <h3>Card 2</h3>
    //         <p>Some text</p>
    //         <p>Some text</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-6">
          <div className="card " style={{ width: "25rem" }}>
            <img className="card-img-top " src="../img/financephoto.jpg" />

            <div className="card-body">
              <h5 className="card-title">Linuxhint Articles</h5>

              <p className="card-text">
                We write articles to educate the world!
              </p>

              <a href="#" className="btn btn-outline-primary btn-sm">
                Visit link
              </a>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card" style={{ width: "25rem" }}>
            <img className=" card-img-top" src="../img/financephoto.jpg" />

            <div className="card-body">
              <h5 className="card-title">Linuxhint Videos</h5>

              <p className="card-text">
                Watch video tutorials of course for free!
              </p>

              <a href="#" className="btn btn-outline-primary btn-sm">
                Visit link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Test;
