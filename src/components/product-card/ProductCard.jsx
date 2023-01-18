import { LazyLoadImage } from "react-lazy-load-image-component"
import AddIcon from '../../assets/other-images/add-to-cart.png';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import { Toaster } from "react-hot-toast";

const ProductCard = ({ item }) => {

    const dispatch = useDispatch();

    // for adding product to redux
    const handleClick = (item) => {
        dispatch(addProduct({
            id: `${item.id}_${item.colors[0].color}_${item.colors[0].sizes[0]}`,
            title: item.title,
            product: item,
            quantity: 1,
            color: item.colors[0].color,
            images: item.colors[0].images,
            size: item.colors[0].sizes[0],
            price: item.price,
            message: `1 ədəd ${item.colors[0].color} rəngli ${item.title} (${item.colors[0].sizes[0]}) səbətə əlavə olundu!`,
        }));
    };

  return (
    <motion.div layout className='card'>
        <Toaster
          position='bottom-left'
          toastOptions={{
            duration: 5000
          }}
        />
        <Link to={`/product/${item.id}`} className="product-link Link">
            <div className='img-container'>
                <LazyLoadImage
                    className='card-img'
                    src={item.colors[0].images[0]}
                    alt='card'
                    effect="blur"
                    placeholderSrc={item.colors[0].images[0]}
                />
            </div>
            <div className='card-info'>
                <span className='category-span'>{item.brand} </span>
                <span className='card-title'>{item.title}</span>
            </div>
        </Link>
        <div className='card-bottom'>
            <span className='card-price'>
                {item.discount ? (
                    <><span className='discount-price'>{item.price + item.discount} AZN</span> {item.price} AZN</>
                ) : (
                    <>{item.price} AZN</>
                )}
            </span>
            <button className='add-btn' onClick={() => handleClick(item)}>
                <img src={AddIcon} alt='add' />
            </button>
        </div>
    </motion.div>
  )
}

export default ProductCard