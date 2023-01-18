import { useEffect } from "react";
import { Link } from "react-router-dom";
import BannerImg from '../../assets/other-images/home-banner2.webp';
import NewProducts from '../new-products/NewProducts'

const Home = () => {

    useEffect(() => {
        const changePage = () => {
            window.scrollTo({ top: 0 });
        };
        changePage()
    }, []);

    return (
    <div className='home'>
        <div className='hero-container'>
            <img src={BannerImg} alt='hero' />
            <div className='hero-title'>
                <span className="top">Ən Məhşur Brendlər</span>
                <span className="mid">Müasir Tərz</span>
                <p className="bottom">
                    Kişi Geyim Dünyasında hər zövqə uyğun keyfiyyətli paltarlar tapa bilərsiniz. 
                    Bizi seçin və tərzinizi daha da gözəlləşdirin.
                </p>
            </div>
        </div>
        <div className="new-products-container">
            <h1>Yeni Gələn Geyimlər</h1>
            <NewProducts />
            <Link to='/products/Bütün Geyimlər' className="all-link Link">Bütün Geyimlər</Link>
        </div>
    </div>
    )
}

export default Home