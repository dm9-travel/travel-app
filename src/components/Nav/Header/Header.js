import React, { Component } from 'react';

// Import components
import Search from './../../Search/Search/Search';
import NavBar from './../NavBar/NavBar';

import './Header.css';


const bgPics = [
  // { pic: 'https://images.unsplash.com/photo-1445525994741-05c3738e5a89?auto=format&fit=crop&w=1450&q=80', location: 'Los Angeles, USA' },
  // {
  //   pic: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?auto=format&fit=crop&w=1445&q=80',
  //   location: 'Paris, France'
  // },
  // { pic: 'https://images.unsplash.com/photo-1504843812413-16480b674871?auto=format&fit=crop&w=1850&q=80', location: 'Venice, Italy' },
  { pic: 'https://images.unsplash.com/photo-1502786174879-2d6009a77d2b?auto=format&fit=crop&w=1500&q=80', location: 'Adriatic Coast, Croatia' },
  // { pic: 'https://images.unsplash.com/photo-1455245737663-3edc3b61dd1a?auto=format&fit=crop&w=1650&q=80', location: 'Los Angeles, USA' },
  // { pic: 'https://images.unsplash.com/photo-1511102135937-044812ec618a?auto=format&fit=crop&w=1850&q=80', location: 'Los Angeles, USA' },
  { pic: 'https://images.unsplash.com/photo-1455245580044-664ab5a916db?auto=format&fit=crop&w=1550&q=80', location: 'Los Angeles, USA' },
  { pic: 'https://images.unsplash.com/photo-1496773589367-79ee06195d0b?auto=format&fit=crop&w=1550&q=80', location: 'Kruger National Park, South Africa' },
  { pic: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1553&q=80', location: 'Greece' },
  // { pic: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1450&q=80', location: 'Oia, Greece' },
  { pic: 'https://images.unsplash.com/photo-1461609027498-7c0524aba788?auto=format&fit=crop&w=1689&q=80', location: 'Rio de Janeiro, Brasil' },

  // ,
  // 'https://images.unsplash.com/photo-1495754076962-759c8ab7e32c?auto=format&fit=crop&w=1134&q=80', 
  // 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?auto=format&fit=crop&w=1845&q=80', 
  // 'https://images.unsplash.com/photo-1504843812413-16480b674871?auto=format&fit=crop&w=1850&q=80',
  // 'https://images.unsplash.com/photo-1502786174879-2d6009a77d2b?auto=format&fit=crop&w=1880&q=80',
];

let jumbotronStyle = {};
let bgLocation = '';

function randomBackground() {
  const randomNumberInRange = () => Math.floor(Math.random() * bgPics.length);
  const random = randomNumberInRange()

  jumbotronStyle = {
    backgroundImage: 'url(' + bgPics[random].pic + ')'
  };

  bgLocation = bgPics[random].location;
}


class Header extends Component {
  componentDidMount() {
    randomBackground();
  }

  render() {

    return (
      <div className="jumbotron jumbotron-fluid bg-info" style={jumbotronStyle}>
        <NavBar />
        <div className="container header-title">
          <div className="w-80">
            <h1 className="display-3">Explore the World</h1>
            <p className="lead">This is a simple hero unit, a jumbotron component for calling extra attention to featured content.</p>

            <Search />
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="location text-muted">
              {bgLocation}
            </div>
          </div>
        </div>



      </div>
    )
  }

}

export default Header;
