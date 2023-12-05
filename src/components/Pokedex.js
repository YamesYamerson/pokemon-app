import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pokedex.css'; // Make sure the path to the CSS file is correct

class Pokedex extends React.Component {
  render() {
    return (
      <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <div className='row align-items-center'>
                <div className="col-auto d-flex flex-column align-items-center">
                  {/* Large Blue Circular Button over the White Circular Button */}
                  <div className="large-circle-button-white btn btn-lg">
                    <div className='large-circle-button-blue btn btn-lg'></div>
                  </div>
                  {/* Small Buttons */}
                  <div className="small-buttons-cluster">
                    <button className="button-red small-circle-button btn btn-danger rounded-circle me-2"></button>
                    <button className="button-yellow small-circle-button btn rounded-circle me-2"></button>
                    <button className="button-green small-circle-button btn rounded-circle"></button>
                  </div>
                </div>
                <div className="col text-center">
                  <span className="h4 mb-0">Pokedex</span>
                </div>
              </div>
            </div>
            <div className="card-body">
                <div className="row justify-content-center">
                  <div className='screen-background'>
                    <div className="col-md-5 screen-area-container w-75 justify-content-center">
                      <div className="screen-area text-white text-center d-flex justify-content-center align-items-center">
                        <span className="h2">Pokemon Screen</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 pokedex-svg-container">
                    <svg className="pokedex-svg" xmlns="http://www.w3.org/2000/svg">
                    <rect width="800" height="454.742239" rx="0" ry="0" transform="translate(0 145.257761)" fill="#dc0a2d" strokeWidth="0"/>
                      <polygon points="0,-157.554163 149.842914,-48.686914 92.608014,127.463996 -92.608014,127.463996 -149.842914,-48.686914 0,-157.554163" transform="matrix(.650791 0.759257-.759257 0.650791 312.816861 145.257761)" fill="#dc0a2d" strokeWidth="0"/>
                      <rect width="600" height="156.492095" rx="0" ry="0" transform="translate(251.295928 0.000001)" fill="#dc0a2d" strokeWidth="0"/>
                      <path d="M0,145.257761q164.14127,0,167.5591,0L351.295928,0.000001l448.704073-.196486" fill="none" stroke="#490107" strokeWidth="8"/>
                      <path d="M15.833572,583.083205l-2.61648-417.328474h171.770544L358.559289,21.697328l400.224653-.000001l5.966816,561.385877-572.917186.000001Z" transform="translate(0 0.000001)" fill="none" stroke="#000" strokeWidth="2"/>                    </svg>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col">
                    {/* Status Bar Section */}
                    <div className="status-bar">
                      <span className="status-text">Status: OK</span>
                      <span className="status-text">Battery: Full</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokedex;
