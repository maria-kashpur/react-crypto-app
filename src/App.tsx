
import AppLayout from "./components/layout/AppLayout";
import { CriptoContextProvider } from "./context/cripto-context";

function App() {
  return (
    <CriptoContextProvider>
      <AppLayout/>
    </CriptoContextProvider>
  );
}

export default App;
