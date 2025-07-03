import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';

import SearchInput from '../assets/image/search-input.svg';
import Date from '../assets/image/date.svg';
import NewsImage from '../assets/image/news_img.svg';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate } from '../helper/formatDate';

const GNews = () => {


    const navigate = useNavigate();


    const [searchQuery, setSearchQuery] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedSource, setSelectedSource] = useState(null);

    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const newsLimit = 15;

    const [newsSaved, setNewsSaved] = useState({});

    const handleNewsBookMark = (index) => {
        setNewsSaved((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };


    const calculatePagination = (currentPage, totalItems, itemsPerPage) => {
        const lastPage = Math.ceil(totalItems / itemsPerPage);
        const from = (currentPage - 1) * itemsPerPage + 1;
        const to = Math.min(from + itemsPerPage - 1, totalItems);

        return {
            currentPage,
            from,
            to,
            lastPage,
            nextPage: currentPage < lastPage ? currentPage + 1 : null,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            perPage: itemsPerPage,
            total: totalItems,
        };
    };

    const filteredNews = useMemo(() => {
        return news.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [news, searchQuery]);

    useEffect(() => {
        const fetchNewsFromBothAPIs = async () => {
            setLoading(true);
            try {

                const res = await fetch(`https://gnews.io/api/v4/search?q=immigration&apikey=aaf4027377a5d2682fd96bd789199790`)
                if (!res.ok) {
                    throw new Error('One or both news APIs failed');
                }
                const gnewsData = await res.json();

                const allNews = [
                    ...gnewsData.articles.map((article) => ({
                        title: article.title,
                        link: article.url,
                        description: article.description,
                        pubDate: article.publishedAt,
                        image: article.image || NewsImage,
                        content: article.content
                    }))
                ];
                setNews(allNews);
                setPagination(calculatePagination(1, allNews.length, newsLimit));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching or parsing news articles:", error);
                setError(true);
                setLoading(false);
            }
        };

        fetchNewsFromBothAPIs();
    }, [newsLimit]);

    const handleGnews = async () => {
        setLoading(true)
        try {
            const res = await fetch(`https://gnews.io/api/v4/search?q=immigration&apikey=aaf4027377a5d2682fd96bd789199790`)
            if (!res.ok) {
                throw new Error('One or both news APIs failed');
            }
            const gnewsData = await res.json();

            const allNews = [
                ...gnewsData.articles.map((article) => ({
                    title: article.title,
                    link: article.url,
                    description: article.description,
                    pubDate: article.publishedAt,
                    image: article.image || NewsImage,
                    content: article.content
                }))
            ];

            setNews(allNews);
            setPagination(calculatePagination(1, allNews.length, newsLimit));
            setLoading(false);
            setSelectedSource("gnews");
        } catch (error) {
            console.error("Error fetching or parsing news articles:", error);
            setError(true);
            setLoading(false);
        }
    }

    const handleNewsAPIs = async () => {
        setLoading(true)
        try {
            const res = await fetch(`https://newsapi.org/v2/everything?q=immigration&sortBy=publishedAt&apiKey=231c55b0210a478b98592b33d5ecaac6`)
            if (!res.ok) {
                throw new Error('One or both news APIs failed');
            }
            const newsApisData = await res.json();

            const allNews = [
                ...newsApisData.articles.map((article) => ({
                    title: article.title,
                    link: article.url,
                    description: article.description,
                    pubDate: article.publishedAt,
                    image: article.urlToImage || NewsImage,
                    content: article.content
                }))
            ];

            setNews(allNews);
            setPagination(calculatePagination(1, allNews.length, newsLimit));
            setLoading(false);
            setSelectedSource("newsapi");
        } catch (error) {
            console.error("Error fetching or parsing news articles:", error);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        setPagination((_prev) =>
            calculatePagination(currentPage, filteredNews.length, newsLimit)
        );
    }, [currentPage, newsLimit, filteredNews.length]);


    return (
        <>

            <section className='latest_news news'>
                <div className="container">
                    <div className="top">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <h1>
                                    Latest GNews
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
                        <div className='d-flex justify-content-center py-3 gap-4'>
                            <button className={`${selectedSource === 'gnews' ? 'select main_btn login_btn' : 'main_btn login_btn'}`} type='button' onClick={handleGnews}>Gnews</button>
                            <button className={`${selectedSource === 'newsapi' ? 'select main_btn login_btn' : 'main_btn login_btn'}`} type='button' onClick={handleNewsAPIs}>NewsAPIs</button>
                        </div>
                    </div>

                    <div className="second">
                        <div className="row g-4 g-xl-5">

                            {loading &&
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

                            {filteredNews.length === 0 && !loading && !error && (
                                <div>No news found matching your search query.</div>
                            )}

                            {filteredNews.slice(pagination.from - 1, pagination.to).map((i, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className={`box ${newsSaved[index] ? "saved" : ""}`}>
                                        <div
                                            className="bookmark_click"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNewsBookMark(index);
                                            }}
                                        />
                                        <div className="news_image">
                                            <img
                                                src={i.image}
                                                alt={i.title}
                                                className="img-fluid object-fit-cover w-100"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="info">
                                            <div className="date d-flex align-items-center">
                                                <img src={Date} alt="Date" className="img-fluid me-2" />
                                                {formatDate(i.pubDate)}
                                            </div>
                                            <div className="name">
                                                {i.title.length > 50 ? i.title.slice(0, 50) + "..." : i.title}
                                            </div>
                                            <p>{i.title.length > 65 ? i.title.slice(0, 65) + "..." : i.title}</p>
                                            <button
                                                type="button"
                                                className="news_btn"
                                                onClick={() => {
                                                    navigate("/gnews/detail/1", { state: { article: i } })
                                                }}
                                            >
                                                Read more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                    {filteredNews.length !== 0 && !loading && (
                        <Pagination pagination={pagination} onPageChange={setCurrentPage} />
                    )}

                </div>
            </section>

        </>
    )
}

export default GNews;



































// const [newsApiRes, gnewsRes] = await Promise.all([
//     fetch(`https://newsapi.org/v2/everything?q=immigration&apiKey=231c55b0210a478b98592b33d5ecaac6`),
//     fetch(`https://gnews.io/api/v4/search?q=immigration&apikey=aaf4027377a5d2682fd96bd789199790`)
// ]);

// if (!newsApiRes.ok || !gnewsRes.ok) {
//     throw new Error('One or both news APIs failed');
// }

// const newsApiData = await newsApiRes.json();
// const gnewsData = await gnewsRes.json();

// const allNews = [
//     ...newsApiData.articles.map((article) => ({
//         title: article.title,
//         link: article.url,
//         description: article.description,
//         pubDate: article.publishedAt,
//         image: article.urlToImage || NewsImage,
//         content: article.content
//     })),
//     ...gnewsData.articles.map((article) => ({
//         title: article.title,
//         link: article.url,
//         description: article.description,
//         pubDate: article.publishedAt,
//         image: article.image || NewsImage,
//         content: article.content
//     }))
// ];


{/* {
                                [...LatestNewsData, ...LatestNewsData, ...LatestNewsData]?.slice(0, 15)?.map((i, index) => {
                                    return (
                                        <div className="col-lg-4" key={index}>
                                            <div
                                                className={`box ${newsSaved[index] ? 'saved' : ''}`}
                                            >
                                                <div
                                                    className="bookmark_click"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNewsBookMark(index);
                                                    }}
                                                />

                                                <div className="news_image">
                                                    <img src={i?.image} alt="" className='img-fluid object-fit-cover' />
                                                </div>

                                                <div className="info">
                                                    <div className="date d-flex align-items-center">
                                                        <img src={Date} alt="Date" className='img-fluid me-2' />
                                                        {i?.date}
                                                    </div>
                                                    <div className="name">
                                                        {i?.name}
                                                    </div>
                                                    <p>
                                                        {i?.description}
                                                    </p>

                                                    <button
                                                        type='button'
                                                        className='news_btn'
                                                        onClick={() => navigate("/user/news-detail/1")}
                                                    >
                                                        Read more
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            } */}