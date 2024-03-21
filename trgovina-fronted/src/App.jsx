import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Smjerovi from "./pages/smjerovi/Smjerovi"

import './App.css';

function App() {
  return (
@@ -10,6 +13,7 @@ function App() {
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          <Route path={RoutesNames.SMJEROVI_PREGLED} element={<Smjerovi />} />
        </>
      </Routes>
    </>
  )
}
export default App