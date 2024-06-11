import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Header(props) {

    const [loc, setLoc] = useState(null)
    const [showOver, setshowOver] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    const locations = [
        {
            city: "Ambala",
            lat: 30.360993,
            long: 76.797819
        },
        {
            city: "Phagwara",
            lat: 30.7333148,
            long: 76.7794179
        },
        {
            city: "Amaravati",
            lat: 20.933272,
            long: 77.75152
        },
        {
            city: "Amritsar",
            lat: 31.622337,
            long: 74.875335
        },
        {
            city: "Asansol",
            lat: 23.683333,
            long: 86.983333
        },
        {
            city: "Aurangabad",
            lat: 19.880943,
            long: 75.346739
        },
        {
            city: "Aurangabad",
            lat: 24.752037,
            long: 84.374202
        },
        {
            city: "Bakshpur",
            lat: 25.894283,
            long: 80.792104
        },
        {
            city: "Bamanpuri",
            lat: 28.804495,
            long: 79.040305
        },
        {
            city: "Baramula",
            lat: 34.209004,
            long: 74.342853
        },
        {
            city: "Barddhaman",
            lat: 23.255716,
            long: 87.856906
        },
        {
            city: "Kancheepuram",
            lat: 12.839929,
            long: 79.700151
        },
        {
            city: "Kannur",
            lat: 11.867025,
            long: 75.353183
        },
        {
            city: "Kanpur",
            lat: 26.449923,
            long: 80.331871
        },
        {
            city: "Karaikal",
            lat: 10.920044,
            long: 79.838005
        },
        {
            city: "Karaikudi",
            lat: 10.066667,
            long: 78.8
        },
        {
            city: "Surendranagar",
            lat: 22.728399,
            long: 71.637077
        },
        {
            city: "Suryapet",
            lat: 17.155985,
            long: 79.617475
        },
        {
            city: "Tadepallegudem",
            lat: 16.814759,
            long: 81.527046
        },
        {
            city: "Tadpatri",
            lat: 14.908562,
            long: 78.005646
        },
        {
            city: "Tambaram",
            lat: 12.9327,
            long: 80.1275
        },
        {
            city: "Tenali",
            lat: 16.2428,
            long: 80.6401
        },
        {
            city: "Thane",
            lat: 19.2183,
            long: 72.9781
        },
        {
            city: "Thanjavur",
            lat: 10.786999,
            long: 79.137827
        },
        {
            city: "Thiruvananthapuram",
            lat: 8.524139,
            long: 76.936638
        },
        {
            city: "Thoothukudi",
            lat: 8.809991,
            long: 78.134846
        },
        {
            city: "Thrissur",
            lat: 10.527641,
            long: 76.214434
        },
        {
            city: "Tinsukia",
            lat: 27.500069,
            long: 95.366302
        },
        {
            city: "Tiruchchirappalli",
            lat: 10.805,
            long: 78.6856
        },
        {
            city: "Tirunelveli",
            lat: 8.711899,
            long: 77.756938
        },
        {
            city: "Tirupati",
            lat: 13.6355,
            long: 79.4192
        },
        {
            city: "Tiruppur",
            lat: 11.1075,
            long: 77.3398
        },
        {
            city: "Tiruvannamalai",
            lat: 12.2295,
            long: 79.067
        },
        {
            city: "Tonk",
            lat: 26.1602,
            long: 75.7902
        },
        {
            city: "Tumkur",
            lat: 13.3422,
            long: 77.101
        },
        {
            city: "Udaipur",
            lat: 24.57127,
            long: 73.691544
        },
        {
            city: "Udupi",
            lat: 13.342222,
            long: 74.748611
        },
        
    ]


    return (
        <div className='header-container d-flex justify-content-between'>

            <div className="header">
                <Link className='links' to="/">  HOME </Link>
                <select value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)
                }} >
                    {
                        locations.map((item, index) => {
                            return (
                                <option value={`${item.lat},${item.long} `} className='options'>
                                    {item.city}
                                </option>
                            )
                        })
                    }
                </select>
                <input className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > <FaSearch /> </button>
            </div>

            <div>
                <div
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#002f34',
                        width: '40px',
                        height: '40px',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }} >  W </div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    background: '#eee',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: 1,
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#002f34',
                    borderRadius: '7px',
                    
                }}>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-profile">
                                <button className="logout-btn">MY PROFILE</button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/add-product">
                                <button className="logout-btn">ADD PRODUCT  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> FAVOURITES  </button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login">  LOGIN </Link> :
                            <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
                    </div>



                </div>}
            </div>

        </div>
    )
}


export default Header;