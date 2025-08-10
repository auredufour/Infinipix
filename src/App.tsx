import { Header } from './components/layout/header/header.components'
import type { Photo } from './features/photos/photo.types'
import { usePhotoList } from './features/photos/usePhoto'

function App() {
  const { status, data, error } = usePhotoList({ page: 1, limit: 30 })

  return (
    <div>
      <Header />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
          gap: 16,
        }}
      >
        {status === 'loading' && <p>Loading photos…</p>}
        {status === 'error' && <p>Error: {error?.message}</p>}
        {data?.items?.map((p: Photo) => {
          return (
            <>
              <img
                key={p.id}
                src={p.download_url}
                alt={p.author}
                style={{ width: '100%', height: 120, objectFit: 'cover' }}
              />
              <p>{p.author}</p>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default App
