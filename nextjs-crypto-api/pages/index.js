import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import CoinList from '../../components/CoinList'
import Layout from '../../components/Layout'
import SearchBar from '../../components/SearchBar'
import styles from '../styles/Home.module.css'

export default function Home({filteredCoins}) {
  const [search, setSearch] = useState('')

  const allcoins = filteredCoins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleChange = e => {
      e.preventDefault()

      setSearch(e.target.value.toLowerCase())
    }
  return (
   <Layout>
    <div className='coin_app'>
     <SearchBar type='text' placeholder='Search' onChange={handleChange} />
     <CoinList filteredCoins={allCoins} />
    </div>
   </Layout>
  )
}


export const getServerSideProps = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');

  const filteredCoins = await res.json();

  return {
    props: {
      filteredCoins
    }
  };
};