// Dependencies
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// store
import { setMenuItemDetail } from '../eshopSlice';

//components
import Quantity from '../components/Quantity'

function MenuItemDetails() {
    const { menuItemDetails } = useSelector(state => state.eshop);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const { categoryName, menuItemId } = useParams();

    const getData = async () => {
        setLoader(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuItemId}`);
        const data = await response.json();
        setLoader(false);
        dispatch(setMenuItemDetail(data?.meals[0]));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            {
                loader ?
                    <h3>Loading...</h3> :
                    <>
                        <h2>
                            <Link to={'/'} className='underline'>All Categories</Link> / <Link to={`/category-details/${categoryName}`} className='underline'>{categoryName}</Link> / {menuItemDetails?.strMeal}
                        </h2>
                        <div className='menu-container'>
                            <img
                                src={menuItemDetails?.strMealThumb}
                                alt='category-icon'
                                height={400}
                            />
                            <div className='menu-details'>
                                <h3>{menuItemDetails?.strMeal}</h3>
                                <p className='meal-description'>{menuItemDetails?.strInstructions}</p>
                                <h4>${menuItemDetails?.idMeal} /-</h4>
                                <Quantity
                                    menuDetails={menuItemDetails}
                                />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}

export default MenuItemDetails;
