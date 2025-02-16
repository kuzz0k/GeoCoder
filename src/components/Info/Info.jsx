import cls from './Info.module.scss'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Info = ({ location, scale }) => {
  const blockRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 800) {
      let newWidth
      if (scale === 1.5) {
        newWidth = '20vw'
      } else if (scale === 1) {
        newWidth = '30vw'
      } else {
        newWidth = '40vw'
      }
      gsap.to(blockRef.current, {
        width: newWidth,
        right: '10vw',
        duration: 1.5,
        ease: "power2.out",
      })


    }
  }, [scale])

  return (
    <div 
    className={cls.main} 
    ref={blockRef}
    style={{width: '3vw'}}
    >
      <section className={cls.box}>
        <h1>Geocoder</h1>
        <p>Tap anywhere in the globe to find out the coordinates, country and city of the selected point.</p>
        <p className={cls.info}>
          {location.place}
        </p>
        {location.lat ? (<p className={cls.info}>lat: {location.lat}</p>) : <></>}
        {location.lon ? (<p className={cls.info}>lon: {location.lon}</p>) : <></>}
      </section>
    </div>
  )
}

export default Info