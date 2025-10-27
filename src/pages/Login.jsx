import LoginForm from '../components/Forms/LoginForm';

const Login = ({ onPageChange }) => {
    return (
        <section id="login" className="page-section active">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                </h2>
                <div className="form-container">
                    <LoginForm onPageChange={onPageChange} />
                </div>
            </div>
        </section>
    );
};

export default Login;