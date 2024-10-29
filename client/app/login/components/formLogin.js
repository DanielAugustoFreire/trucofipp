import { useRef } from "react"
import { useRouter } from 'next/router';


export default function FormLogin( ){
  


  let objUsuario = {
    email: "",
    senha: ""
  }

  let emailRef = useRef();
  let senhaRef = useRef();


  function Login(){
    if(!(emailRef.current.value === "" || senhaRef.current.value === ""))
    {
      objUsuario.email = emailRef.current.value;
      objUsuario.senha = senhaRef.current.value;
      fetch("http://localhost:5000/auth/token",{
        method: "POST", 
        body: JSON.stringify(objUsuario),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((res) => res.json())
      .then((data) =>{
        
      })
    }else{
      alert("Preencha todos os campos");
    }
  }





    return (
        <div>
        <div className="divider d-flex align-items-center my-4">
          <h2>TRUCOFIPP ONLINE</h2>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            ref={emailRef}
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Digitge um email Valido"
          />
          <label className="form-label">
            Email
          </label>
        </div>

        <div data-mdb-input-init className="form-outline mb-3">
          <input
            ref={senhaRef}
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Digite Sua senha"
          />
          <label className="form-label">
            Senha
          </label>
        </div>

        <div className="d-flex justify-content-between align-items-center">

          <a href="/login/registrar" className="text-body">
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