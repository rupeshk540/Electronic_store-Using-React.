import React, { useState, useEffect } from 'react';
import HomePageComponent from '../components/HomePageComponent';
import { useNavigate } from 'react-router-dom';
import {Bot,Flame,Truck,ShieldCheck,Clock3} from "lucide-react";
import CountdownTimer from '../components/CountdownTimer';

const HotDealsPage = () => {

  return (

    <div className="hot-deals-page">
      <style jsx>{`
        .hero-section{
          background:linear-gradient(135deg,#6366F1,#4F46E5);
          color:white;
          padding:45px 0;
        }

       .ai-badge{
          display:inline-block;
          background:rgba(255,255,255,.18);
          border:1px solid rgba(255,255,255,.25);
          padding:8px 18px;
          border-radius:30px;
          font-size:.9rem;
          font-weight:600;
          backdrop-filter:blur(10px);
         }

        .hero-title{
            font-size:2.8rem;
            font-weight:700;
            line-height:1.2;
        }

        .hero-subtitle{
            margin-top:18px;
            font-size:1.1rem;
            opacity:.92;
            max-width:600px;
        }

            .hero-features{
              display:flex;
              flex-wrap:wrap;
              gap:14px;
              margin-top:30px;
            }

          .feature-chip{
            display:flex;
            align-items:center;
            gap:10px;
            background:rgba(255,255,255,.10);
            border:1px solid rgba(255,255,255,.15);
            border-radius:14px;
            padding:11px 18px;
            font-size:.92rem;
            font-weight:500;
            color:white;
          }

        .chip-icon{
            flex-shrink:0;
        }

        .ai-icon{
            color:#7CF6FF;
        }

        .deal-icon{
            color:#FFD166;
        }

        .delivery-icon{
            color:#A7F3D0;
        }

        .secure-icon{
            color:#86EFAC;
        }

       
        @media(max-width:992px){
        
        .hero-section{
          padding:35px 0;   
        }
        .hero-title{
          font-size:2.2rem;
        }

        .hero-features{
          justify-content:center;
        }

      }
      `}</style>
      {/* Hero Section */}
    <div className="hero-section">
        <div className="container">

            <div className="row align-items-center">

                {/* Left */}

                <div className="col-lg-7">

                    <span className="ai-badge">
                        ✨ Powered by Zeptra AI
                    </span>

                    <h1 className="hero-title mt-3">
                        AI-Powered Smart Shopping
                    </h1>

                    <p className="hero-subtitle">
                        Discover trending products, exclusive offers and smarter
                        recommendations with Zeptra AI.
                    </p>

                    <div className="hero-features">

                        <div className="feature-chip">
                            <Bot size={16} className='chip-icon ai-icon'/>
                            AI Recommendations
                        </div>

                        <div className="feature-chip">
                            <Flame size={16} className='chip-icon deal-icon'/>
                            Daily Hot Deals
                        </div>

                        <div className="feature-chip">
                            <Truck size={16} className='chip-icon delivery-icon'/>
                            Fast Delivery
                        </div>

                        <div className="feature-chip">
                            <ShieldCheck size={16} className='chip-icon'/>
                            Secure Checkout
                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="col-lg-5">

                 <CountdownTimer/>
                </div>

            </div>

        </div>
    </div>
      
      <HomePageComponent/>

      
    </div>
  );
};

export default HotDealsPage; 
