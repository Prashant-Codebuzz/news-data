import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';

import SearchInput from '../assets/image/search-input.svg';
import Date from '../assets/image/date.svg';
import NewsImage from '../assets/image/news_img.svg';


import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate } from '../helper/formatDate';

import { getMediaStackNewsService } from '../services/services';


const MediaStackNews = () => {



    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    console.log(error);

    const [newsLit, setNewsLit] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        limit: 12,
        total: 0
    });

    const GetNewsData = async (page = currentPage) => {
        setLoader(true);



        try {
            const res = await getMediaStackNewsService(page, searchQuery);
            console.log(res);

            // if (res?.status === 200) {
            setNewsLit(res?.data);
            setPagination({
                currentPage: page,
                lastPage: Math.ceil(res.pagination?.total / 12),
                limit: 12,
                total: res.pagination?.total
            });
            // } 
            // else {

            if (res?.error?.code === "usage_limit_reached") {
                setError(res?.error?.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        GetNewsData(currentPage);
    }, [searchQuery, currentPage])


    const filteredNews = newsLit;
    // .filter(i =>
    //     i?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     i?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     i?.count?.[0]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     i?.category?.[0]?.toLowerCase().includes(searchQuery.toLowerCase())
    // );


    return (
        <>

            <section className='latest_news news'>
                <div className="container">

                    {/* <div className='d-flex justify-content-center py-3 gap-4'>
                        <button className={`${selectedSource === 'gnews' ? 'select main_btn login_btn' : 'main_btn login_btn'}`} type='button' onClick={handleGnews}>NewsData</button>
                        <button className={`${selectedSource === 'newsapi' ? 'select main_btn login_btn' : 'main_btn login_btn'}`} type='button' onClick={handleNewsAPIs}>MediaStack </button>
                    </div> */}

                    <div className="top">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <h1>
                                    MediaStack News
                                </h1>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center justify-content-end">
                                <div className="input-group">
                                    <span className='icon'>
                                        <img src={SearchInput} alt="" className='img-fluid' />
                                    </span>

                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="form-control"
                                        placeholder="What type of news you looking for ?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="second">

                        {filteredNews?.length === 0 && !loader && !error && (
                            <div className='text-dark text-center fw-bold'>No news found matching your search query.</div>
                        )}

                        {error && (
                            <div className='text-danger text-center fw-bold mt-5 pt-5'>{error}</div>
                        )}

                        <div className="row g-4 g-xl-5">

                            {loader &&
                                <>
                                    {
                                        Array.from({ length: 9 }).map((_, index) => (
                                            <div key={index} className="col-lg-4">
                                                <Skeleton heig ht={200} />
                                                <Skeleton width={`60%`} />
                                                <Skeleton count={3} />
                                            </div>
                                        ))
                                    }
                                </>
                            }

                            {/* {filteredNews?.slice(pagination.from - 1, pagination.to).map((i, index) => ( */}
                            {filteredNews?.length > 0 &&
                                filteredNews?.map((i, index) => (
                                    <div className="col-lg-4" key={index}>
                                        <div className={`box h-100`}>
                                            <div className="news_image">
                                                <img
                                                    src={i.image}
                                                    alt={i.author}
                                                    className="img-fluid object-fit-cover w-100"
                                                    loader="lazy"
                                                />
                                            </div>
                                            <div className="info d-flex flex-column flex-grow-1">
                                                <p className='text-dark fw-600'>
                                                    Country : {i?.country}

                                                    <span className='mx-1'>|</span>

                                                    Category : {i?.category}
                                                </p>
                                                <div className="date d-flex align-items-center">
                                                    <img src={Date} alt="Date" className="img-fluid me-2" />
                                                    {formatDate(i.published_at)}
                                                </div>

                                                <div className="name">
                                                    {i.title?.length > 50 ? i.title?.slice(0, 50) + "..." : i.title}
                                                </div>
                                                <p>
                                                    {i.description?.length > 65 ? i.description?.slice(0, 65) + "..." : i.description}
                                                </p>
                                                <button
                                                    type="button"
                                                    className="news_btn mt-auto"
                                                    onClick={() => {
                                                        navigate(`/mediastack-news/detail/${i?.title}`, { state: { article: i } })
                                                    }}
                                                >
                                                    Read more
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    </div>

                    {filteredNews?.length > 0 && (
                        // <div className='my-5 text-center'>
                        //     <button
                        //         type='button'
                        //         className={`main_btn login_btn`}
                        //     // onClick={fetchMoreNews}
                        //     >
                        //         More
                        //     </button>
                        // </div>

                        <Pagination pagination={pagination} onPageChange={setCurrentPage} />
                    )}

                </div>
            </section>

        </>
    )
}

export default MediaStackNews;