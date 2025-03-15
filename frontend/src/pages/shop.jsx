import React from 'react' 
import Hero from '../Components/Hero/Hero'
import Ppopular from '../Components/popular/Popularr'
import Offers from '../Components/offers/offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const shop = ()=>{
    return(
        <div>
            <Hero> </Hero>
            <Ppopular/>
            <Offers/>
            <NewCollections/>
            <NewsLetter></NewsLetter>
        </div>
    )
}

export default shop;