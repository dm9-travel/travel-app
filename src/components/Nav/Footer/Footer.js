import React, {Component} from 'react';
import './Footer.css'

 class Footer extends Component {
render(){
  return (


<footer className="page-footer stylish-color-dark">


  <div className="container">


      <div className="row text-center text-md-left mt-3 pb-3">


          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="title mb-4 font-bold">Company name</h6>
              <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>




          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="title mb-4 font-bold">Products</h6>
              <p><a href="#!">MDBootstrap</a></p>
              <p><a href="#!">MDWordPress</a></p>
              <p><a href="#!">BrandFlow</a></p>
              <p><a href="#!">Bootstrap Angular</a></p>
          </div>





          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="title mb-4 font-bold">Useful links</h6>
              <p><a href="#!">Your Account</a></p>
              <p><a href="#!">Become an Affiliate</a></p>
              <p><a href="#!">Shipping Rates</a></p>
              <p><a href="#!">Help</a></p>
          </div>





          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="title mb-4 font-bold">Contact</h6>
              <p><i className="fa fa-home mr-3"></i> New York, NY 10012, US</p>
              <p><i className="fa fa-envelope mr-3"></i> info@example.com</p>
              <p><i className="fa fa-phone mr-3"></i> + 01 234 567 88</p>
              <p><i className="fa fa-print mr-3"></i> + 01 234 567 89</p>
          </div>


      </div>




      <div className="row py-3 d-flex align-items-center">


          <div className="col-md-8 col-lg-9">


              <p className="text-center text-md-left grey-text">© 2017 Copyright: <a href="https://www.MDBootstrap.com"><strong> MDBootstrap.com</strong></a></p>


          </div>



          <div className="col-md-4 col-lg-3 ml-lg-0">


              <div className="social-section text-center text-md-left">
                  <ul>
                      <li><a className="btn-floating btn-sm rgba-white-slight mr-xl-4"><i className="fa fa-facebook"></i></a></li>
                      <li><a className="btn-floating btn-sm rgba-white-slight mr-xl-4"><i className="fa fa-twitter"></i></a></li>
                      <li><a className="btn-floating btn-sm rgba-white-slight mr-xl-4"><i className="fa fa-google-plus"></i></a></li>
                      <li><a className="btn-floating btn-sm rgba-white-slight mr-xl-4"><i className="fa fa-linkedin"></i></a></li>
                  </ul>
              </div>


          </div>


      </div>

  </div>

</footer>


    )
  }
}
export default Footer
