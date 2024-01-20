import React from 'react'
import contructionIcon from '../Images/contructionIcon.png';
import '../Styles/construction.scss'
import Header from './Header.jsx';

function UnderConstruction() {
  return (
    <>
    <Header />
    <div className='master-PUC-container'>
      <div className='PUC-container'>
        <div className='PUC-title'>Page Under Construction</div>
        <img className='PUC-icon' src={contructionIcon} alt="" />
        <div className='PUC-title'>Come Back Soon</div>
      </div>
    </div>
    </>
  )
}

export default UnderConstruction