import { Link } from "react-router-dom";
import bannerImg from "../../assets/header1.png"; 

const Banner = () => {
    return (
        <div className='section__container header__container'>
            <div className="header__content w-30">
                <h4 className="uppercase">Sale 15%</h4>
                <h1>Pizza Sale </h1>
                <p>The top in the world is beautiful</p>
                <button className="btn">
                    <Link to="shop">SHOPPING NOW</Link>
                </button>
            </div>
            <div className="header__image">
                <img src={bannerImg} alt="Banner" /> {/* Corrected image source */}
            </div>
        </div>
    );
};

export default Banner;
