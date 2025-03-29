import { BrowserRouter } from "react-router-dom"
import RoutesList from "./routes/RoutesList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './App.css'
import { WishlistProvider } from "./context/wishList";



function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <RoutesList>

        </RoutesList>
      </BrowserRouter>
    </WishlistProvider>
  )
}
export default App
