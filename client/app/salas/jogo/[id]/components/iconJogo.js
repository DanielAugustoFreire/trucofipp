export default function IconeJogo({ protagonista }) {
    return (
        <div className={`d-flex justify-content-center bg-dark  p-2 align-items-center`}>
            <img className={`rounded-circle ${protagonista ? 'bg-warning' : 'bg-primary'}`} src="/img/senhor_apostador.png" width={'50px'} alt="Logo Truco FIPP" />
        </div>
    )
}
