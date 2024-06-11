import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import io from 'socket.io-client';
import "./ProductDetail.css"; // Import CSS file for styling
let socket;

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [user, setUser] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        socket = io(API_URL);

        socket.on('connect', () => {
            console.log('Connected to socket');
        });

        return () => {
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on('getMsg', (data) => {
            const filteredMsgs = data.filter((item) => item.productId === productId);
            setMsgs(filteredMsgs);
        });
    }, [productId]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-product/${productId}`);
                if (response.data.product) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Server Error');
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSend = () => {
        const data = { username: localStorage.getItem('userName'), msg, productId };
        socket.emit('sendMsg', data);
        setMsg('');
    }

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                console.error('Error fetching user details:', err);
                alert('Server Error');
            });
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                {product && (
                    <div className="row">
                        <div className="col-md-6 text-center"> {/* Center the product image */}
                            <img src={`${API_URL}/${product.pimage}`} alt={product.pname} className="product-image" />
                            {product.pimage2 && <img src={`${API_URL}/${product.pimage2}`} alt={product.pname} className="product-image" />}
                        </div>
                        <div className="col-md-6 userdis">
                            <h2>{product.pname}</h2>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Description:</strong> {product.pdesc}</p>
                            <p><strong>Price:</strong> Rs. {product.price}</p>
                            {product.addedBy && (
                                <button className="btn btn-primary" onClick={() => handleContact(product.addedBy)}>
                                    Show Contact Details
                                </button>
                            )}
                            {user && (
                                <div className="contact-details">
                                    <h4>Contact Details</h4>
                                    <p><strong>Name:</strong> {user.username}</p>
                                    <p><strong>Mobile:</strong> {user.mobile}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="mt-5">
                    <h3>Chats</h3>
                    <div className="chat-container">
                        {msgs.map((item) => (
                            <div key={item._id} className={`message ${item.username === localStorage.getItem('userName') ? 'outgoing' : 'incoming'}`}>
                                <p><strong>{item.username}</strong>: {item.msg}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3">
                        <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} className="form-control" placeholder="Type your message" />
                        <button onClick={handleSend} className="btn btn-primary mt-2">Send</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
