import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });

        const url2 = API_URL + '/liked-products';
        let data = { userId: localStorage.getItem('userId') };

        axios.post(url2, data)
            .then((res) => {
                if (res.data.products) {
                    setLikedProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, [refresh]);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setCProducts(res.data.products);
                setIsSearch(true);
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => {
            if (item.category === value) {
                return item;
            }
        });
        setCProducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.');
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setRefresh(!refresh);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.');
            return;
        }

        const url = API_URL + '/dislike-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setRefresh(!refresh);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div>
            <Header search={search} handleSearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {isSearch && cProducts && (
                <h5>SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                </h5>
            )}

            {isSearch && cProducts && cProducts.length === 0 && <h5>No Results Found</h5>}
            {isSearch && (
                <div className="d-flex justify-content-center flex-wrap">
                    {cProducts && products.length > 0 &&
                        cProducts.map((item) => (
                            <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                <img  src={API_URL + '/' + item.pimage} alt={item.pname} />
                                <p className="m-2">{item.pname} | {item.category}</p>
                                <h3 className="m-2 price-text">{item.price}</h3>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        ))}
                </div>
            )}

            {!isSearch && (
                <div className="d-flex justify-content-center flex-wrap">
                    {products && products.length > 0 &&
                        products.map((item) => (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div className="icon-con">
                                    {likedProducts.find((likedItem) => likedItem._id === item._id) ?
                                        <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                        <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                                    }
                                </div>
                                <img src={API_URL + '/' + item.pimage} alt={item.pname} />
                                <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                                <p className="m-2">{item.pname} | {item.category}</p>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Home;
