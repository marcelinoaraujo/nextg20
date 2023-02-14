import { UsuarioUseCase } from "@/@core/application/usuario/usuario.use-case"; 
import { Usuario, UsuarioProps } from "@/@core/domain/entities/usuario";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { container, Registry } from "../../@core/infra/container-registry";

type UsuarioDetailPageProps = {
  usuario: UsuarioProps;
};

export const UsuarioDetailPage: NextPage<UsuarioDetailPageProps> = ({
  usuario,
}) => {
  const usuarioEntity = new Usuario({...usuario});
  return (
    <div>
      <h3>{usuarioEntity.nome}</h3>
      <label>login</label> {usuarioEntity.login}
      <br /><br />
      <Link href={`/usuarios`} passHref>
              Voltar
            </Link>
      <Link href={`/usuarios/edit/${usuarioEntity.id}`} passHref>
             Editar            </Link>

    </div>
  );
};

export default UsuarioDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const useCase = container.get<UsuarioUseCase>(Registry.UsuarioUseCase);
  const usuario = await useCase.get(+id!);
  return {
    props: {
      usuario: usuario.toJSON(),
    },
  };
};
