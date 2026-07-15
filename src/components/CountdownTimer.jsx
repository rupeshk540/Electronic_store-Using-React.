import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Clock3} from "lucide-react";

const CountdownTimer = () => {

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });
  const navigate=useNavigate();
  const [activeCategory] = useState('all');
  

 // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

return (

    <div className="countdown-card">
        <style>
        {`
            .countdown-card{

                background:white;
                backdrop-filter:blur(12px);

                border-radius:18px;

                padding:28px;

                color:#333;
                box-shadow:0 15px 35px rgba(74, 11, 11, 0.18) 

            }

            .count-title{

                display:flex;

                justify-content:center;

                align-items:center;

                gap:8px;

                margin-bottom:20px;

                font-size:1.05rem;

                font-weight:600;
            }

            .count-wrapper{

                display:flex;

                justify-content:space-between;

                gap:10px;
            }

            .count-box{

            flex:1;

            text-align:center;

            background:#EEF2FF;

            border-radius:14px;

            padding:14px;
            }

            .count-box span{

            display:block;

            font-size:1.8rem;

            font-weight:700;
            color:#4F46E5
            }

            .count-box small{

            font-size:.75rem;

            text-transform:uppercase;

            opacity:.9;

            letter-spacing:1px;
            }

             
        @media(max-width:992px){
        
        .countdown-card{
          margin-top:30px;
        }
        `}
        </style>
        <div className="count-title">
            <Clock3 size={18}/>
            Flash Sale Ends In
        </div>

        <div className="count-wrapper">

            <div className="count-box">
                <span>{String(timeLeft.days).padStart(2,"0")}</span>
                <small>Days</small>
            </div>

            <div className="count-box">
                <span>{String(timeLeft.hours).padStart(2,"0")}</span>
                <small>Hours</small>
            </div>

            <div className="count-box">
                <span>{String(timeLeft.minutes).padStart(2,"0")}</span>
                <small>Minutes</small>
            </div>

            <div className="count-box">
                <span>{String(timeLeft.seconds).padStart(2,"0")}</span>
                <small>Seconds</small>
            </div>

        </div>

    </div>
    
);

};

export default CountdownTimer;