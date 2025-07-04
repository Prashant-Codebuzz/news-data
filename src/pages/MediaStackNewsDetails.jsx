import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import NewsDate from '../assets/image/news_date.svg';
import NewsSave from '../assets/image/news_save.svg';
import NewsSent from '../assets/image/news_sent.svg';

import { formatDate } from '../helper/formatDate';

const MediaStackNewsDetails = () => {
    const location = useLocation();
    const { article } = location.state || {};

    console.log(article);

    return (
        <>


            {/* ------ News-Detail Start ------ */}
            <div className="news_detail">
                <div className="container">
                    <div className="top">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="left">
                                    <img src={article.image} alt="" className='img-fluid' />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="right">
                                    <div className="date">
                                        <img src={NewsDate} alt="" className='img-fluid me-2' />
                                        {/* 22 December 2023 */}
                                        {formatDate(article.published_at)}

                                        {/* <span className='mx-1'>|</span>
    
                                            {article?.country[0]}
    
                                            <span className='mx-1'>|</span>
    
                                            {article?.category[0]} */}

                                    </div>

                                    <h1>
                                        {/* Your Comprehensive Guide to
                                                Successfully Pursuing */}

                                        {article.title}
                                    </h1>

                                    <p className='text-dark fw-900 mb-1' style={{ fontSize: '19px' }}>Country : {article?.country}</p>
                                    <p className='text-dark fw-900' style={{ fontSize: '19px' }}>Category : {article?.category}</p>
                                    {/* <div className="sent">
                                                <div>
                                                    <img src={NewsSave} alt="" className='img-fluid' />
                                                </div>
                                                <div>
                                                    <img src={NewsSent} alt="" className='img-fluid' />
                                                </div>
                                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="second">
                        <p dangerouslySetInnerHTML={{
                            __html: article.description
                        }}></p>
                    </div>
                </div>
            </div>
            {/* ------ News-Detail End ------ */}

        </>
    )
}

export default MediaStackNewsDetails