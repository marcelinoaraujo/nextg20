import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { UsuarioUseCase } from "@/@core/application/usuario/usuario.use-case"; 
import { UsuarioProps } from "@/@core/domain/entities/usuario"; 
import { container, Registry } from "@/@core/infra/container-registry";

import { Table, Row, Col, Tooltip, User, Text, Button } from "@nextui-org/react";
import { IconButton } from "@/components/icons/IconButton";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { EditIcon } from "@/components/icons/EditIcon"; 
import { DeleteIcon } from "@/components/icons/DeleteIcon"; 
import { useRouter } from "next/router";
import { InsertIcon } from "@/components/icons/InsertIcon";

type UsuariosProps = {
  usuarios: UsuarioProps[];
};

const Usuarios: NextPage<UsuariosProps> = ({ usuarios }) => {
  const router = useRouter();
  const columns = [
    { name: "ACTIONS", uid: "actions" },
    { name: "Nome", uid: "nome" },
    { name: "Login", uid: "login" },
  ];  
  const renderCell = (user: UsuarioProps, columnKey: React.Key) => {
    switch (columnKey) {
      case "nome":
        return (
          <span>{user.nome}</span>
        );
      case "login":
        return (
          <span>{user.login}</span>
        );
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Detalhes">
                <IconButton onClick={() => router.push(`/usuarios/${user.id}/R`)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar">
                <IconButton onClick={() => router.push(`/usuarios/${user.id}/U`)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return "";
    }
  };  
  return (
    <div>
      Usuários
      <Tooltip
                content="Novo"
                color="default"
                onClick={() => router.push(`/usuarios/0/C`)}
              >
                <IconButton>
                  <InsertIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
    <Table
      aria-label="Usuarios"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={usuarios}>
        {(item: UsuarioProps) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    </div>
  );
};

export default Usuarios;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const useCase = container.get<UsuarioUseCase>(Registry.UsuarioUseCase);
  const usuarios = await useCase.list();

  return {
    props: {
      usuarios: usuarios.map((usu: { toJSON: () => any; }) => usu.toJSON()),
    },
  };
};
