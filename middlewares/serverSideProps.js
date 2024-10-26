import AuthMiddleware from "./authMiddleware.js";

const auth = new AuthMiddleware();

export async function getServerSideProps(context) {
    const { req } = context;
    const cookie = req.headers.cookie;

    const res = auth.validarParaFrontEnd(cookie);

    if(res.status !== 200) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const data = await res.json();
    return {props: { usuario: data.usuario }};

}