import {useEffect } from 'react'
import cls from './Info.module.scss'
import { latToPlace } from '../../http/geocodeApi'

const Info = () => {


  // useEffect(() => {
  //   latToPlace(lat, lon)
  //   .then(data => console.log(data))

  // }, [])
  


  return (
    <div className={cls.main}>
      <section className={cls.box}>
        <h1>Geocoder</h1>
        <p>Tap anywhere in the globe to find out the coordinates, country and city of the selected point.</p>
      </section>
    </div>
  )
}

export default Info