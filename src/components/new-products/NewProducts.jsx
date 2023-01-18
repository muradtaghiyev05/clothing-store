import { clothes } from '../../clothes/data';
import ProductCard from '../product-card/ProductCard';

const NewProducts = () => {

  return (
    <div className='new-products'>
        {clothes.slice(0, 8).map(item => (
            <ProductCard key={item.id} item={item} />
        ))}
    </div>
  )
}

export default NewProducts