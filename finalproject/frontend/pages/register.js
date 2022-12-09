import { CacheProvider } from '@emotion/react'
import RegisterForm from '../components/register/register_form'
import Navbar from '../components/navbar/navbar'
import createCache from '@emotion/cache'

const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function RegisterPage() {
  return (
    <CacheProvider value={cache}>
      <Navbar />
      <RegisterForm />
    </CacheProvider>
  )
}
