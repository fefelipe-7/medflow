import { RootLayout } from '@/layouts/RootLayout'
import { DashboardView } from '@/modules/dashboard/views/DashboardView'

function App() {
  // In a real router, this would route to different views
  return (
    <RootLayout>
      <DashboardView />
    </RootLayout>
  )
}

export default App
