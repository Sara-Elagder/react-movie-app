import { BrowserRouter } from "react-router-dom";
import RoutesList from "./routes/RoutesList";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import { WishlistProvider } from "./context/wishList";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
    return (
        <LanguageProvider>
            <WishlistProvider>
                <BrowserRouter>
                    <RoutesList />
                </BrowserRouter>
            </WishlistProvider>
        </LanguageProvider>
    );
}
export default App;
