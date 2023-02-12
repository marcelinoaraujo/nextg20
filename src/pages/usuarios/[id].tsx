import { GetUsuarioUseCase } from "@/@core/application/usuario/get-usuario.uses-case";
import { Usuario, UsuarioProps } from "@/@core/domain/entities/usuario";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useContext } from "react";
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
      <label>email</label> {usuarioEntity.email}
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
  const useCase = container.get<GetUsuarioUseCase>(Registry.GetUsuarioUseCase);
  const usuario = await useCase.execute(+id!);
  return {
    props: {
      usuario: usuario.toJSON(),
    },
  };
};
