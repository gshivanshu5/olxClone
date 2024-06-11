import { Link, useNavigate } from 'react-router-dom';
import './Categories.css';
import categories from './CategoriesList';

function Categories(props) {
    const navigate = useNavigate();

    return (
        <div className='cat-container'>
            <div>
                <span className='pr-3'>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => (
                        <span
                            key={index}
                            className='category'
                            onClick={() => navigate(`/category/${item}`)}
                        >
                            {item}
                        </span>
                    ))}
            </div>
        </div>
    );
}

export default Categories;
