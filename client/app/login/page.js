import FormLogin from "./components/formLogin.js";
import ImgTrucoFipp from "./components/imgTrucoFipp.js"
import Footerlogin from "./components/footerLogin.js"


export default function Login() {

    function Login(){
      
        
    }
    return (
      <div className="mt-5">
        <section class="vh-100">
          <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">

              <ImgTrucoFipp></ImgTrucoFipp>
              <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <FormLogin></FormLogin>
              </div>
            </div>
            <Footerlogin></Footerlogin>
          </div>

        </section>
      </div>
    );
  }
  