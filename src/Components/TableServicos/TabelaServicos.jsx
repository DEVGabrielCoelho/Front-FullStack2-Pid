// Desenvolvido por Isabella Poloni

import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
  Stack,
} from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";

export default function TableServico(props) {
  function filtrarServicos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/servicos", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaServicos) => {
        if (Array.isArray(listaServicos)) {
          const resultadoBusca = listaServicos.filter((servico) =>
            servico.servico.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setServicos(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Cadastrar serviço
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque serviços aqui"
          onChange={filtrarServicos}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código</th>
            <th className="text-center">Serviço</th>
            <th className="text-center">Jornada</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Custo</th>
            <th className="text-center">Modelo</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaServicos?.map((servico) => {
            return (
              <tr key={servico.id}>
                <td className="text-center">{servico.id}</td>
                <td className="text-center">{servico.servico}</td>
                <td className="text-center">{servico.jornada}</td>
                <td className="text-center">{servico.descricao}</td>
                <td className="text-center">{servico.custo}</td>
                <td className="text-center">{servico.modelo}</td>
                <td>
                  <Stack
                    direction="horizontal"
                    className="justify-content-center"
                    gap={4}
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Deseja atualizar os dados do serviço?"
                          )
                        ) {
                          props.editar(servico);
                        }
                      }}
                    >
                      <MdModeEdit />
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        if (window.confirm("Deseja excluir?")) {
                          props.deletar(servico);
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
