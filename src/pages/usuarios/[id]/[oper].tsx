import { UsuarioUseCase } from "@/@core/application/usuario/usuario.use-case"; 
import { Usuario, UsuarioProps } from "@/@core/domain/entities/usuario";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, SetStateAction, useState } from "react";
import { container,Registry } from "@/@core/infra/container-registry";


type UsuarioDetailPageProps = {
  oper: string,
  usuario: UsuarioProps;
};

export const UsuarioDetailPage: NextPage<UsuarioDetailPageProps> = ({
  oper,usuario
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
    if (oper=='C') {
      usuario.senha = event.currentTarget.senha.value;
      const wusu = await fercase.post(new Usuario(usuario));
        router.push(`/usuarios`);
      } else {  
        const wusu = await fercase.udpate(new Usuario(usuario));
        router.push(`/usuarios`);
    }    
  }
  const usuarioEntity = new Usuario({...usuario});
  return (
    <div>
      <label>Usuário</label>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Login</label>
          <input disabled={oper=='R'}
            type="text"
            name="login"
            id="login"
            defaultValue={usuarioEntity.login}
          />
        </div>
        <div>
          <label htmlFor="">Nome</label>
          <input disabled={oper=='R'}
            type="text"
            name="nome"
            id="nome" 
            defaultValue={usuarioEntity.nome}
          />
        </div>
        {  (oper=='C') && <div >
          <label htmlFor="">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha" 
          />
        </div>}
        {  (oper!='R') && <div >
          <button type="submit">Salvar</button>
        </div>}
        {  (oper!='R') && <Link href={`/usuarios`} passHref>
              Cancelar
            </Link>}
        {  (oper=='R') && <Link href={`/usuarios`} passHref>
              Voltar
            </Link>}
      </form>
    </div>    
  );
};

export default UsuarioDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string
  const oper = context.query.oper as string
  var usuario = new Usuario({nome: '',login: '',id:0}) 
  if (oper!='C') {
      const useCase = container.get<UsuarioUseCase>(Registry.UsuarioUseCase);
      usuario = await useCase.get(+id!);
  }
  return {
    props: {
      oper: oper,
      usuario: usuario.toJSON(),
    },
  };
};
