import React from 'react'
import Header from '../Components/Header.jsx'
import Hero from '../Components/Hero.jsx'
import Search from '../Components/Search.jsx'
import Features from '../Components/Features.jsx'
import About from '../Components/About.jsx'
import Why_us from '../Components/Why_us.jsx'
import Testimonials from '../Components/Testimonial.jsx'
import CTA from '../Components/CTA.jsx'
import Footer from '../Components/Footer.jsx'
import '../App.css'

const LandingPage = () => {
    return (
        <>
        <Header/>
        <Hero/>
        <Search/>
        <Features/>
        <About/>
        <Why_us/>
        <Testimonials/>
        <CTA/>
        <Footer/>
        </>
    )
}

export default LandingPage
