export type UsuarioProps = {
    login: string;
    nome: string;
    senha?: string;
    id?: number;
  };
  
  export class Usuario {
    constructor(public props: UsuarioProps) {}
  
    get id() {
      return this.props.id;
    }
  
    get login() {
      return this.props.login;
    }
  
    get nome() {
      return this.props.nome;
    }
  
    get senha() {
      return this.props.senha;
    }

    toJSON(){
      return {
        id: this.id,
        login: this.login,
        nome: this.nome,
        naturalidade: this.senha||''
      }
    }
  }
  