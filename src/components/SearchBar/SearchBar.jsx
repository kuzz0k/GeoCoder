import React from 'react'
import cls from './SearchBar.module.scss'

const SearchBar = () => {
  return (
    <div className={cls.bar}>
      <input type="text" placeholder='Поиск'/>
    </div>
  )
}

export default SearchBar