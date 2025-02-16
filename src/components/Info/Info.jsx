import cls from './Info.module.scss'

const Info = ({ location }) => {

  return (
    <div className={cls.main}>
      <section className={cls.box}>
        <h1>Geocoder</h1>
        <p>Tap anywhere in the globe to find out the coordinates, country and city of the selected point.</p>
        <p>{location.place}</p>
        {location.lat ? (<p>lat: {location.lat}</p>) : <></>}
        {location.lon ? (<p>lon: {location.lon}</p>) : <></>}
      </section>
    </div>
  )
}

export default Info