import React from 'react'
import './Gallery.scss'
import myFarm from '../../Assets/Images/myFarm.avif'
import flatFarm from '../../Assets/Images/flat-farm-landscape.avif'
import chick from '../../Assets/Images/chicks.jpg'
import cocks from '../../Assets/Images/cocks.avif'
import chicken from '../../Assets/Images/close-up-beautiful-chicken.avif'
import poultryFarm from '../../Assets/Images/photorealistic-scene-poultry-farm-with-chickens.avif'
import poultryFarm2 from '../../Assets/Images/poultryFarm.avif'
import rooster from '../../Assets/Images/photorealistic-view-rooster.avif'
import colorRooster from '../../Assets/Images/red-black-brown-rooster.avif'
import beautifulRooster from '../../Assets/Images/beautiful-rooster.avif'
import meat from '../../Assets/Images/meat.avif'

const Gallery = () => {
  return (
    <div className='row col-md-12 m-0 p-0 pageContainer'>
      <div id="carouselExampleAutoplaying" className="carousel slide col-md-6 col-sm-12" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item">
            <img src={myFarm} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item active">
            <img src={flatFarm} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={chick} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={cocks} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={chicken} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={poultryFarm} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={rooster} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={colorRooster} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={beautifulRooster} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={meat} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={poultryFarm2} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Gallery