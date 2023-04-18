import { useState } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { useGetAllCardsQuery } from 'redux/services/apiSlice'
import { Loader } from 'components/molecules/Loader'
import { Header } from 'components/organisms/Header'
import { Button } from 'components/atoms/Button'
import { CardList } from 'components/organisms/CardList'
import { Overlay } from 'components/molecules/Overlay'
import { AddCardForm, TransferBalanceForm } from 'components/organisms/Forms'

export default function Home() {
  const [transferOverlayOpen, setTransferOverlayOpen] = useState<boolean>(false)
  const [addOverlayOpen, setAddOverlayOpen] = useState<boolean>(false)

  const { data: cards, isLoading } = useGetAllCardsQuery()

  return (
    <div>
      <Head>
        <title>Dashboard | CardMaster</title>
        <meta
          name="description"
          content="CardMaster | Manage all your bank cards in one place"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      {(isLoading || !cards) && <Loader />}

      <ToastContainer />

      <Overlay open={transferOverlayOpen} setOpen={setTransferOverlayOpen}>
        {cards && (
          <TransferBalanceForm setOpen={setTransferOverlayOpen} cards={cards} />
        )}
      </Overlay>
      <Overlay open={addOverlayOpen} setOpen={setAddOverlayOpen}>
        <AddCardForm setOpen={setAddOverlayOpen} />
      </Overlay>

      <section>
        <Header title="Welcome, John">
          {cards && cards?.length >= 2 && (
            <Button
              text="Transfer Balance"
              event={() => setTransferOverlayOpen(true)}
            />
          )}
          <Button text="Add Card" event={() => setAddOverlayOpen(true)} />
        </Header>

        {cards && (
          <>
            <CardList
              title={'Credit Cards'}
              cards={cards.filter((card) => card.cardType === 'credit')}
            />

            <CardList
              title={'Debit Cards'}
              cards={cards.filter((card) => card.cardType === 'debit')}
            />
          </>
        )}
      </section>
    </div>
  )
}
