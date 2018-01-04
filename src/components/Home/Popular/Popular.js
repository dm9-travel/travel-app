import React, { Component } from 'react';

import './Popular.css';

class Popular extends Component {

  render() {

    return (
      <div className="container popular">

        <div className="row pt-5 pb-4">
          <div className="w-80">
            <h1 className="display-6">Explore the World</h1>
            <p className="lead">This is a simple hero unit, a jumbotron component for calling extra attention to featured content.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-7 pl-0">
            <div className="card bg-dark text-white h-200">
              <img className="card-img" src="https://images.unsplash.com/photo-1479660095429-2cf4e1360472?auto=format&fit=crop&w=951&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">New York</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
          <div className="col-sm-5 pl-0 pr-0">
            <div className="card bg-dark text-white h-100">
              <img className="card-img" src="https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&w=950&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">Paris</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4 pl-0">
            <div className="card bg-dark text-white h-100">
              <img className="card-img" src="https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=926&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">Tokyo</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
          <div className="col-sm-4 pl-0">
            <div className="card bg-dark text-white h-100">
              <img className="card-img" src="https://images.unsplash.com/photo-1504802309034-73ef35653660?auto=format&fit=crop&w=767&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">Rome</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
          <div className="col-sm-4 pl-0 pr-0">
            <div className="card bg-dark text-white h-100">
              <img className="card-img" src="https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=950&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">Shanghai</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6 pl-0">
            <div className="card bg-dark text-white h-100">
              <img className="card-img" src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1650&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">Los Angeles</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
          <div className="col-sm-6 pl-0 pr-0">
            <div className="card bg-dark text-white h-100">
              <img className="card-img" src="https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?auto=format&fit=crop&w=1049&q=80" alt="Card image"></img>
              <div className="card-img-overlay">
                <h1 className="card-title text-left">London</h1>
                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Last updated 3 mins ago</p> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}

export default Popular;
