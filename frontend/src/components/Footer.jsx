const Footer = () => {
    return (
        <>
            <footer className="section__container footer__container">
                <div className="footer__col">
                    <h4>CONTACT INFO</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"> </i></span>
                        123, An Khanh , Ninh Kieu, Can Tho
                    </p>
                    <p>
                        <span><i className="ri-mail-line"></i></span>
                        support_shop@gmail.com
                    </p>
                    <p>
                        <span><i className="ri-phone-line"></i></span>
                        123-456-789-0
                    </p>
                </div>

                <div className="footer__col">
                    <h4>Company</h4>
                    <a href="/">Home</a>
                    <a href="/">Contact</a>
                    <a href="/">About us</a>
                    <a href="/">Our blog</a>
                    <a href="/">Work with us</a>
                </div>

                <div className="footer__col">
                    <h4>Useful Links</h4>
                    <a href="/">Help</a>
                    <a href="/">Support 24/7</a>
                    <a href="/">Food</a>
                    <a href="/">Drink</a>
                    <a href="/">Combo</a>
                </div>

                <div className="footer__col">
                    <h4>Follow Us</h4>
                    <div className="footer__socials">
                        <a href="#"><i className="ri-facebook-fill"></i></a>
                        <a href="#"><i className="ri-instagram-fill"></i></a>
                        <a href="#"><i className="ri-twitter-fill"></i></a>
                        <a href="#"><i className="ri-youtube-fill"></i></a>
                    </div>
                </div>

                
            </footer>
            
        </>
    );
};

export default Footer;
