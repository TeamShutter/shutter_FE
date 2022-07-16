import Head from 'next/head'
import Image from 'next/image'
import { GetStudios } from '../components/fetcher/fetcher'
import styles from '../styles/Home.module.css'

export default function Home() {
  const {data, isLoading, isError} = GetStudios();

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!!</div>
  console.log("data: ", data);

  return data && (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to LikeLion Hackerthon
        </h1>

        <p className={styles.description}>
          Photo Platform{' '}
          <code className={styles.code}>파이팅!!</code>
        </p>


        {data.map((studio) => {
          return (
            <div key={studio.name} className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>{studio.name}</h2>
                <p>{studio.description}</p>
                <p>{studio.rate}</p>
                <p>{studio.follow}</p>
              </a>

            </div> 
          )
        })}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
