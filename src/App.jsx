import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CadProdutos from "./Pages/CadProdutos/TelaCadProdutos";
import TelaCadPessoa from "./Pages/CadPessoas/CadPessoa";
import CadServicos from "./Pages/CadServicos/TelaCadServicos";
import CadCategoria from "./Pages/CadCategoria/TelaCadCategoria";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/frontEndFullStack2/" element={<Login />} />
          <Route path="/frontEndFullStack2/Home" element={<Home />} />
          {/* <Route path="/CadastroProduto" element={<CadProdutos />} /> */}
          <Route
            path="/frontEndFullStack2/CadastroPessoas"
            element={<TelaCadPessoa />}
          />
          {/* <Route path="/frontEndFullStack2/CadastroServicos" element={<CadServicos />} />
          <Route path="/frontEndFullStack2/CadastroCategoria" element={<CadCategoria/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
