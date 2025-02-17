'use client'
import httpClient from "@/app/utils/httpClient"
import UserContext from "@/app/context/userContext"
import { useRouter } from "next/navigation";
import { useRef } from "react";
import ImgTrucoFipp from "../../components/imgTrucoFipp";


export default function Registar(){

  let objUsuario = {
    email: "",
    nome: "",
    senha: ""
  }
  
  let emailRef = useRef();
  let nomeRef = useRef();
  let senhaRef = useRef();

  const router = useRouter()

  function Registrar(){
    if(!(nomeRef.current.value === "" || emailRef.current.value === "" || senhaRef.current.value === ""))
    {
      objUsuario.email = emailRef.current.value;
      objUsuario.nome = nomeRef.current.value;
      objUsuario.senha = senhaRef.current.value;

      httpClient.post("/auth/cadastrar", objUsuario)
      .then(response => {
        if(response.status === 201){
          return response.json();
        }else{
          return false;
        }
      })
      .then(data => {
        if(data){
          alert("Cadastro Realizado com sucesso")
          router.push("/login");
        }else{
          alert("Dados invalidos");
          router.push("/login/registrar");
        }
      })
    }else{
      alert("Preencha todos os campos");
    }
  }

  const backgroundStyle = {
    backgroundImage: 'url(/img/imgLogin.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'fixed', // Usando "fixed" para garantir que a imagem cubra a tela inteira
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Colocando a imagem atrás do formulário
  };
  
  const formStyle = {
    position: 'relative',
    zIndex: 1, // Garantir que o formulário fique sobre a imagem de fundo
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  };
  
  return (
    <div>
      <div style={backgroundStyle} /> {/* Imagem de fundo */}
      <form style={formStyle}>
      <ImgTrucoFipp></ImgTrucoFipp>
        <div className="divider d-flex align-items-center mb-5" style={{color:'white'}}>
          <h2>Cadastre-se gratuitamente</h2>
        </div>
  
        <label className="form-label" style={{color:'white'}}>Email</label>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            ref={emailRef}
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Email"
          />
        </div>
  
        <label className="form-label" style={{color:'white'}}>Nome</label>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            ref={nomeRef}
            type="text"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Nome"
          />
        </div>
  
        <label className="form-label" style={{color:'white'}}>Senha</label>
        <div data-mdb-input-init className="form-outline mb-3">
          <input
            ref={senhaRef}
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Senha"
          />
        </div>
  
        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            onClick={Registrar}
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}