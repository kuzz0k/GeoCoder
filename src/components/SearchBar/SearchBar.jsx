import React from 'react'
import cls from './SearchBar.module.scss'
import { useState, useEffect } from 'react'
import { placeToLat } from '../../http/geocodeApi'

const SearchBar = ({ setLocation, setSearch }) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const handleKeyPress = (e) => {
      if(inputValue && e.key === 'Enter') {
        placeToLat(inputValue)
        .then(data => {
          setLocation({place: data[0].display_name, lat: data[0].lat, lon: data[0].lon})
          setSearch({lat: data[0].lat, lon: data[0].lon})
        })

        setInputValue('')
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [inputValue])
  

  const updateValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={cls.bar}>
      <input 
      type="text" 
      placeholder='Поиск'
      value={inputValue}
      onChange={updateValue}
      />
    </div>
  )
}

export default SearchBar