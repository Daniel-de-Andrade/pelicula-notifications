import GlobalStyle from "./styles/global";
import RoutesApp from "./routes";
import NavbarMain from "./components/NavbarMain";

function App() {
  return (
    <>
      <NavbarMain />
      <RoutesApp />
      <GlobalStyle />
    </>
  );
}

export default App;
