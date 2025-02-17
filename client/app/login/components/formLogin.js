import { useRef, useContext } from "react"
import httpClient from "@/app/utils/httpClient";
import UserContext, { UserProvider } from "@/app/context/userContext";
import { useRouter } from "next/navigation";

export default function FormLogin( ){
  
  let objUsuario = {
    email: "",
    senha: ""
  }

  let emailRef = useRef();
  let senhaRef = useRef();

  const { setUser } = useContext(UserContext);

  const router = useRouter()

  function Login(){
    if(!(emailRef.current.value === "" || senhaRef.current.value === ""))
    {
      objUsuario.email = emailRef.current.value;
      objUsuario.senha = senhaRef.current.value;

      httpClient.post("/auth/token", objUsuario)
      .then(response => {
        if(response.status === 200){
          return response.json();
        }else{
          return false;
        }
      })
      .then(data => {
        if(data){
          setUser(data);
          
          localStorage.setItem("usuario", JSON.stringify(data));

          router.push("/");
        }else{
          alert("Email ou senha incorretos");
          router.push("/login");
        }
      })
    }else{
      alert("Preencha todos os campos");
    }
  }





    return (
        <div>
        <div
          className="divider d-flex align-items-center my-4"
          style={{
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontsize: '20px'// Aplicando a fonte personalizada
          }}
        >
          <h2>TRUCOFIPP ONLINE</h2>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            ref={emailRef}
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Digite um E-mail"
          />
          <label className="form-label" style={{ color: 'white' }} >
            Email
          </label>
        </div>

        <div data-mdb-input-init className="form-outline mb-3">
          <input
            ref={senhaRef}
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Digite uma Senha"
          />
          <label className="form-label" style={{ color: 'white' }}>
            Senha
          </label>
        </div>

        <div className="d-flex justify-content-between align-items-center">

          <a href="/login/registrar"  style={{ color: 'white' }}>
            Nao tem uma conta? Registre-se
          </a>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            type="button"
            onClick={Login}
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Login
          </button>
        </div>
      </div>
    )

}