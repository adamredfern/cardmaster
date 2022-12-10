import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { useGetLogsQuery } from 'redux/services/apiSlice'
import { Loader } from 'components/molecules/Loader'
import { Header } from 'components/organisms/Header'
import { LogTable } from 'components/organisms/LogTable'

export default function Home() {
  const { data: logs, isLoading } = useGetLogsQuery()

  return (
    <div>
      <Head>
        <title>Transactions | CardMaster</title>
        <meta name="description" content="Transactions | CardMaster" />
        <link rel="icon" href="/logo.png" />
      </Head>
ƒ
      {isLoading && <Loader />}

      <ToastContainer />

      <section>
        <Header title="Transactions"></Header>

        {logs && logs?.length > 0 && <LogTable data={logs} />}
        {logs && logs.length === 0 && (
          <div>
            <p>
              <em>
                No entries have been recorded yet. Take actions to produce logs.
              </em>
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
