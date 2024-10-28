import Registar from "./components/registrar.js"
import Footerlogin from "../components/footerLogin.js"

export default function Registrar ()
{
    return (
        <div className="mt-5">
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">

              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <Registar></Registar>
              </div>
            </div>
            <Footerlogin></Footerlogin>
          </div>

        </section>
      </div>
    )
}