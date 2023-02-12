import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { UsuarioUseCase } from "@/@core/application/usuario/usuario.use-case"; 
import { UsuarioProps } from "@/@core/domain/entities/usuario"; 
import { container, Registry } from "@/@core/infra/container-registry";


type UsuariosProps = {
  usuarios: UsuarioProps[];
};

const Usuarios: NextPage<UsuariosProps> = ({ usuarios }) => {
  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario, key) => (
          <li key={key}>
            <label>Nome: </label> {usuario.nome}|
            <Link href={`/usuarios/${usuario.id}`} passHref>
              Ver
            </Link>
          </li>
        ))}
      </ul>
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
