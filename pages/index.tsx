import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      <div>
        <Header />
      </div>
    </div>
  )
}

export default Home
