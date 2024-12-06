import React, { useEffect, useRef, useState } from 'react';
import './Dashboard.scss';
import { useNavigate } from 'react-router';
import Table from '../../Shared/Table/Table';
import * as L from 'leaflet';
import customMarkerImage from '../../Assets/Images/marker.webp';

const Dashboard = () => {
  const mapRef = useRef(null);
  const [latitude, setLatitude] = useState(13.8364);
  const [longitude, setLongitude] = useState(78.9315);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (mapRef.current === null) {
      initLeafletMap();
    }
  }, []);

  const leafletMapImg = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const wmsLayerOptions = {
    layers: 'vehiTrack',
    service: 'WMS',
    version: '1.1.1',
    request: 'GetMap',
    styles: '',
    format: 'image/png',
    transparent: true,
  };

  const dashboardItems = [
    {
      icon: 'fa fa-bar-chart',
      backgroundColor: 'dodgerblue !important',
      label: 'Total',
      key: 'total',
      count: '1500',
      moreInfo: false,
    },
    {
      icon: 'fa fa-pie-chart',
      backgroundColor: '#faa8ca !important',
      label: 'Available',
      key: 'available',
      count: '100',
      moreInfo: false,
    },
    {
      icon: 'fa fa-balance-scale',
      backgroundColor: '#faa8ca !important',
      label: 'Avg.Weight',
      key: 'avgWeight',
      count: '2.53',
      moreInfo: false,
    },
    {
      icon: 'fa fa-money',
      backgroundColor: 'dodgerblue !important',
      label: 'Amount',
      key: 'amount',
      count: '123',
      moreInfo: false,
    },
  ];

  const navigate = useNavigate();
  const handleClick = (element) => {
    navigate(element.key);
    sessionStorage.setItem('selectedSubHeader', element.label);
  };

  const initLeafletMap = () => {
    const map = L.map('leafLetMap').setView([latitude, longitude], zoom);
    mapRef.current = map;

    // Map View
    L.tileLayer.wms(leafletMapImg, wmsLayerOptions, { attribution: 'Tiles © Esri — Source: Esri, DeLorme, NAVTEQ', maxZoom: 18 }).addTo(map);

    // Satellite View

    // const esriLayer = L.tileLayer(
    //   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    //   {
    //     attribution: 'Tiles © Esri',
    //     // maxZoom: 20,
    //     minZoom: 7,
    //   }
    // );
    // esriLayer.addTo(map);

    const customIcon = L.icon({
      iconUrl: customMarkerImage,
      iconSize: [32, 32]
    });

    L.marker([latitude, longitude], { icon: customIcon }).addTo(map)
      .bindPopup('<a class="fw-bold" href="https://www.google.com/maps/place/Chandra+Sekhar+Reddy+Poultry+Farms/@13.8366272,78.9312367,17z/data=!4m15!1m8!3m7!1s0x3bb2e9324a18f533:0x40c6405a62e7e916!2sChandra+Sekhar+Reddy+Poultry+Farms!8m2!3d13.8366154!4d78.9313558!10e5!16s%2Fg%2F11sv57914y!3m5!1s0x3bb2e9324a18f533:0x40c6405a62e7e916!8m2!3d13.8366154!4d78.9313558!16s%2Fg%2F11sv57914y?entry=ttu" target="_blank">Chandra Sekhar Reddy Poultry Farms</a>')
      .openPopup();

    setTimeout(() => {
      map.invalidateSize(true);
    }, 300);
  };

  return (
    <div className='pageContainer row col-md-12 m-0'>
      <div className='row col-md-12 col-sm-12 p-0 m-0'>
        {dashboardItems && dashboardItems.length > 0 && dashboardItems.map((element) => (
          <div className='col-md-3 col-sm-6 col-6 mt-3' key={element.key}>
            <div className='card'>
              <div className='card-body backgroundImage'>
                <div className='cardTransition'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <span>{element.label}</span>
                    <i className={element.icon} aria-hidden='true'></i>
                  </div>
                  <div className=''>{element.count}</div>
                </div>
                {element.moreInfo && (
                  <div className='d-flex justify-content-center align-items-center' style={{ fontSize: '15px' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleClick(element)}>
                      More Info &nbsp; <i className='fa fa-long-arrow-right' aria-hidden='true'></i>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='row m-0'>
        <div className='col-md-8 mt-3'>
          <Table />
        </div>
        <div className='col-md-4 my-3 m-0'>
          <div className='row m-0' id='leafLetMap' style={{ height: '67vh', border: '1px solid #3c4858', borderRadius: '5px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;