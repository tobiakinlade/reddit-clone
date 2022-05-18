import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit Clone</title>
      </Head>
      {/* Post box */}
      <PostBox />

      <div>
        {/* feed */}
        {/*  */}
      </div>
    </div>
  )
}

export default Home
