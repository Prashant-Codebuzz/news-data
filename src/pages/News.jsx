import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';

import SearchInput from '../assets/image/search-input.svg';
import Date from '../assets/image/date.svg';
import NewsImage from '../assets/image/news_img.svg';


import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate } from '../helper/formatDate';

import { getNewsDataService } from '../services/services';

const News = () => {


    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    console.log(error);

    const [newsLit, setNewsLit] = useState([]);

    const [nextPageToken, setNextPageToken] = useState(null);


    const [newsSaved, setNewsSaved] = useState({});

    const handleNewsBookMark = (index) => {
        setNewsSaved((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };


    const GetNewsData = async () => {
        setLoader(true);

        try {
            const res = await getNewsDataService(nextPageToken);
            console.log(res);

            if (res?.status === "success") {
                // setNewsLit(res?.results);
                setNewsLit((prev) => [...prev, ...res.results]);
                setNextPageToken(res.nextPage);
            } else {
                setError(res?.results?.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        GetNewsData();
    }, [])

    const filteredNews = newsLit.filter(i =>
        i?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.count?.[0]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.category?.[0]?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>


            <section className='latest_news news'>
                <div className="container">
                    <div className="top">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <h1>
                                    Latest News
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
                                        <div className={`box h-100 ${newsSaved[index] ? "saved" : ""}`}>
                                            <div
                                                className="bookmark_click"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNewsBookMark(index);
                                                }}
                                            />

                                            <div className="news_image">
                                                <img
                                                    src={i.image_url}
                                                    alt={i.title}
                                                    className="img-fluid object-fit-cover w-100"
                                                    loader="lazy"
                                                />
                                            </div>
                                            <div className="info d-flex flex-column flex-grow-1">
                                                <p className='text-dark fw-600'>
                                                    {i?.country[0]}
                                                </p>
                                                <div className="date d-flex align-items-center">
                                                    <img src={Date} alt="Date" className="img-fluid me-2" />
                                                    {formatDate(i.pubDate)}

                                                    <span className='mx-1'>|</span>

                                                    <div>{i?.category[0]}</div>
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
                                                        navigate(`/news/detail/${i?.article_id}`, { state: { article: i } })
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
                        <div className='my-5 text-center'>
                            <button
                                type='button'
                                className={`main_btn login_btn`}
                                onClick={() => GetNewsData(nextPageToken)}

                            >
                                Next
                            </button>
                        </div>

                        // <Pagination pagination={pagination} onPageChange={setCurrentPage} />
                    )}

                </div>
            </section>

        </>
    )
}

export default News;