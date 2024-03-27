// Dependencies
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// store
import { setCategories } from '../eshopSlice';

function Home() {
    const { categories } = useSelector(state => state.eshop);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const getData = async () => {
        setLoader(true);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setLoader(false);
        dispatch(setCategories(data?.categories));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h2>Categories</h2>
            {
                loader ? <h3>Loading...</h3> : 
                <div className='info-container'>
                {
                    categories?.map((item) => (
                        <Link className='info-card' key={item?.idCategory} to={`/category-details/${item?.strCategory}`}>
                            <img
                                src={item?.strCategoryThumb}
                                alt='category-icon'
                                height={200}
                                width={200}
                            />
                            <div className='info-details'>
                                <h4>{item?.strCategory}</h4>
                            </div>
                        </Link>
                    ))
                }
            </div>
            }
        </div>
    );
}

export default Home;
