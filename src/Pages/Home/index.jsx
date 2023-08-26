// Desenvolvido pelo grupo

import { Container, Stack } from "react-bootstrap";
import "./styled.css";
import Header from "../../Components/Header";
import CarouselComponent from "../../Components/Carousel";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Home = () => {
  return (
    <>
      <Header />
      <Container id="conteudo">
        <Stack className="text-center">
          <h1 className="h1Conteudo">
            Assembleia de Deus - Ministério Belem / Quatá
          </h1>
          <SearchBar
            placeholder={"Informe o Nome do Cliente "}
            data={listCliente}
            campKey={"cpf"}
            campSearch={"nome"}
            functionSelect={() => {}}
            value={""}
          />
          <CarouselComponent />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
