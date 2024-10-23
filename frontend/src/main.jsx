import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App/App'
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

createRoot(document.getElementById('root')).render(
  <StrictMode>
<App/>
  </StrictMode>,
)
