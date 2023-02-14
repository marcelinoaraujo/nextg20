import { UsuarioUseCase } from "@/@core/application/usuario/usuario.use-case"; 
import { Usuario, UsuarioProps } from "@/@core/domain/entities/usuario";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, SetStateAction, useState } from "react";
import { container,Registry } from "@/@core/infra/container-registry";

type UsuarioDetailPageProps = {
  usuario: UsuarioProps;
};

export const UsuarioDetailPage: NextPage<UsuarioDetailPageProps> = ({
  usuario,
}) => {
  // const [nome, setNome] = useState("");
  // const [login, setLogin] = useState("");
  // const nomeInputChange = (e) => {
	// 	setNome(e.target.value);
	// };
  // const loginInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
	// 	setLogin(e.target.value);
	// };
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fercase = container.get<UsuarioUseCase>(Registry.UsuarioUseCase);
    usuario.login = event.currentTarget.login.value;
    usuario.nome = event.currentTarget.nome.value;
    console.log(usuario);
    const wusu = await fercase.udpate(new Usuario(usuario));

    router.push(`/usuarios/${usuario.id}`);
  }
  const usuarioEntity = new Usuario({...usuario});
  return (
    <div>
      <h3>Usuario</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Login</label>
          <input
            type="text"
            name="login"
            id="login"
            defaultValue={usuarioEntity.login}
          />
        </div>
        <div>
          <label htmlFor="">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome" 
            defaultValue={usuarioEntity.nome}
          />
        </div>
        <div>
          <button type="submit">Salvar</button>
        </div>
        <Link href={`/usuarios`} passHref>
              Cancelar
            </Link>
      </form>
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
