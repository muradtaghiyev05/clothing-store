import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductSwiper from '../swiper/ProductSwiper';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import { Toaster } from 'react-hot-toast';
import { clothes } from '../../clothes/data';

const Product = () => {

  const [currentSelection, setCurrentSelection] = useState(0);
  const [currentSize, setCurrentSize] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(addProduct({
      id: currentSize ? 
        `${item.id}_${item.colors[currentSelection].color}_${currentSize}` : 
        `${item.id}_${item.colors[currentSelection].color}_${item.colors[currentSelection].sizes[0]}`,
      title: item.title,
      product: item,
      quantity: itemQuantity,
      color: item.colors[currentSelection].color,
      images: item.colors[currentSelection].images,
      size: currentSize ? currentSize : item.colors[currentSelection].sizes[0],
      price: item.price,
      message:
        currentSize ? `${itemQuantity} ədəd ${item.colors[currentSelection].color} rəngli ${item.title} (${currentSize}) səbətə əlavə olundu!` :
        `${itemQuantity} ədəd ${item.colors[currentSelection].color} rəngli ${item.title} (${item.colors[currentSelection].sizes[0]}) səbətə əlavə olundu!`,
    }));
  };

  const handleSelection = (selection) => {
    setCurrentSelection(selection);
    setItemQuantity(1);
    setCurrentSize('');
  };

  useEffect(() => {
    const changePage = () => {
      window.scrollTo({ top: 0 });
    };
    changePage()
  }, []);

  return (
    clothes.map((product) => (
      parseInt(params.id) === product.id && 
      <div key={product.id} className='product-page'>
        <Toaster
          position='bottom-left'
          toastOptions={{
            duration: 5000
          }}
        />
        <div className='product-page-container con'>
          <div className='swiper-container'>
            <ProductSwiper images={product.colors[currentSelection].images} />
          </div>
          <div className='product-detail-container'>
            <h3>{product.title}</h3>
            <span className='category-span'>{product.brand}</span>
            <span className='detail-info'>Rəng: <b>{product.colors[currentSelection].color}</b></span>
            <div className='color-container'>
              {product.colors.map((item, index) => (
                <div key={index} className={currentSelection === index ? "color-div color-active" : "color-div"}>
                  <button
                    style={{ backgroundColor: item.colorCode }}
                    value={currentSelection}
                    onClick={() => handleSelection(index)}
                    className='color-btn'>
                  </button>
                </div>
              ))}
            </div>
            <span className='detail-info'>Ölçü: <b>{currentSize ? currentSize : product.colors[currentSelection].sizes[0]}</b></span>
            <div className='size-container'>
              <select className='size-select' value={currentSize} onChange={(e) => setCurrentSize(e.target.value)}>
              {product.colors[currentSelection].sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
              </select>
            </div>
            <span className='product-price'>
              {product.discount ? (
                <>
                  <span className='discount-price'>
                    {product.price + product.discount} AZN
                  </span> 
                  {product.price} AZN
                </>
              ) : (
                <>{product.price} AZN</>
              )}
            </span>
            <div className='amount-container'>
              <select className='amount' value={itemQuantity} onChange={(e) => setItemQuantity(parseInt(e.target.value))}>
                {Array.from({ length: 30 }, (item, index) => item = index + 1).map(num => (
                  <option key={num}>{num}</option>
                ))}
              </select>
              <button className='add-to-cart-btn' onClick={() => handleClick(product)}>Səbətə At</button>
            </div>
            <span className='about-product-title'>Məhsul Haqqında</span>
            <p className='about-product-desc'>{product.desc}</p>
          </div>
        </div>
      </div>
    ))
  )
}

export default Product