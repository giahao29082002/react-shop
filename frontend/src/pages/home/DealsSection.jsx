import  { useState, useEffect } from 'react';
import dealsImg from "../../assets/deals.png";

const DealsSection = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date(`2024-10-01`) - +new Date(); // Thời gian đếm ngược đến ngày 1 tháng 10 năm 2024
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <section className='section__container deals__container'>
            <div className="deals__image">
                <img src={dealsImg} alt="" />
            </div>
            <div className="deals__content">
                <h5>Get up to 20% Discount</h5>
                <h4>Deals of September</h4>
                <p>Wendy has all kinds of freebies and coupons in the Offers section of its mobile app this month</p>
                <div className="deals__countdown flex-wrap">
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.days || '0'}</h4>
                        <p>Days</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.hours || '0'}</h4>
                        <p>Hours</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.minutes || '0'}</h4>
                        <p>Minutes</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.seconds || '0'}</h4>
                        <p>Seconds</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
