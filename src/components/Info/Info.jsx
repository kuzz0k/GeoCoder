import cls from './Info.module.scss'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Info = ({ location, scale }) => {
  const blockRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 470) {
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
    >
      <section>
        <div className={cls.info}>
          <h1>Geocoder</h1>
          <p>Tap anywhere in the globe to find out the coordinates, country and city of the selected point.</p>
        </div>
        <div className={cls.api}>
          <p>
            {location.place}
          </p>
          {location.lat ? (<p>lat: {location.lat}</p>) : <></>}
          {location.lon ? (<p>lon: {location.lon}</p>) : <></>}
        </div>
      </section>
    </div>
  )
}

export default Info