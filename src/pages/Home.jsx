import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <>

            <div className='d-flex justify-content-center my-5 gap-4 '>
                <div className='text-center'>
                    <NavLink to="/newsdata" className="main_btn">Go to NewsData</NavLink>
                </div>
                <div className='text-center'>
                    <NavLink to="/mediastack-news" className="main_btn">Go to MediaStack News</NavLink>
                </div>

                <div className='text-center'>
                    <NavLink to="/currents-news" className="main_btn">Go to Currents News</NavLink>
                </div>
            </div>

        </>
    )
}

export default Home