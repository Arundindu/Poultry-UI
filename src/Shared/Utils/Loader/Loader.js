import React, { useEffect, useState } from "react";
import './Loader.scss';
import { Subject } from 'rxjs';

const subCount = new Subject();
let apiCount = 0;
export const loaderService = {
  showLoader: (api = true) => {
    if (api) subCount.next(++apiCount);
    // console.log(apiCount,api,'show');
  },
  hideLoader: (api = true) => {
    if (api) subCount.next(--apiCount);
  }
};

const countObs = () => subCount.asObservable();

export default function Loader() {
  const [activeAPIs, setActiveAPIs] = useState(0);

  useEffect(() => {
    countObs().subscribe(count => {
      try {
        setActiveAPIs(count);
      } catch (e) { console.error(e) }
    });
  }, []);

  if (activeAPIs <= 0) return null;
  return (
    <div className="loader-root">
      <div className="container">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        {/* <Spin size="large" tip="Loading..."/> */}
        {/* {text} */}
      </div>
    </div>
  )
}