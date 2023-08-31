import { Button, Container, Table } from "react-bootstrap";
import { HiTrash } from "react-icons/hi";
import { urlBackend } from "../../assets/funcoes";
import { MdModeEdit } from "react-icons/md";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import SearchBar from "../SearchBar/Searchbar";

export default function TabelaPessoas(props) {
  function listaPessoas(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/pessoas", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaPessoas) => {
        if (Array.isArray(listaPessoas)) {
          const resultadoBusca = listaPessoas.filter((pessoa) =>
            pessoa.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setPessoas(resultadoBusca);
        }
      });
  }

  const [clientSelect, setClientSelect] = useState({});
  const [formValid, setFormValid] = useState(false);

  return (
    <Container>
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Novo Cadastro
      </Button>
      {/* <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termobusca"
          placeholder="Buscar"
          onChange={listaPessoas}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup> */}

      <SearchBar
        placeHolder={"Informe o Nome do Cliente "}
        data={listaPessoas}
        campKey={"cpf"}
        campSearch={"nome"}
        functionSelect={setClientSelect}
        value={""}
      />

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr class="text-center">
            <th class="text-center">Nome</th>
            <th class="text-center">CPF</th>
            <th class="text-center">Data de Nascimento</th>
            <th class="text-center">Endereço</th>
            <th class="text-center">Cidade</th>
            <th class="text-center">Telefone</th>
            <th class="text-center">E-Mail</th>
            <th class="text-center">Tipo</th>
            <th class="text-center">Profissão</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaPessoas?.map((pessoa) => {
            return (
              <tr key={pessoa.nome}>
                <td>{pessoa.nome}</td>
                <td>{pessoa.cpf}</td>
                <td>{pessoa.nascimento}</td>
                <td>{pessoa.endereco}</td>
                <td>{pessoa.cidade}</td>
                <td>{pessoa.telefone}</td>
                <td>{pessoa.email}</td>
                <td>{pessoa.tipo}</td>
                <td>{pessoa.profissao1}</td>
                <td>
                  <Stack direction="horizontal" gap={1}>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        if (
                          window.confirm("Deseja atualizar os dados da pessoa?")
                        ) {
                          props.editar(pessoa);
                        }
                      }}
                    >
                      <MdModeEdit />
                    </Button>

                    {""}
                    <Button
                      variant="outline-danger"
                      Button
                      onClick={() => {
                        if (window.confirm("Deseja excluir permanentemente?")) {
                          props.excluir(pessoa);
                        }
                      }}
                    >
                      <HiTrash />
                    </Button>
                  </Stack>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
