// Dependencies
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// store
import { setMeals } from '../eshopSlice';

function CategoryDetails() {
    const { meals } = useSelector(state => state.eshop);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    let { categoryName } = useParams();

    const getData = async () => {
        setLoader(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        setLoader(false);
        dispatch(setMeals(data?.meals));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h2>
                <Link to={'/'} className='underline'>All Categories</Link> / {categoryName}
            </h2>
            {
                loader ?
                    <h3>Loading...</h3> :
                    (<div className='info-container'>
                        {
                            meals?.map((item) => (
                                <Link to={`${item?.idMeal}`} className='info-card' key={item?.idMeal}>
                                    <img
                                        src={item?.strMealThumb}
                                        alt='category-icon'
                                        height={200}
                                    />
                                    <div className='info-details'>
                                        <h4>{item?.strMeal}</h4>
                                        <p>$ {item?.idMeal} /-</p>
                                        <button className='button-primary'>Add to cart</button>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>)
            }
        </div>
    );
}

export default CategoryDetails;
