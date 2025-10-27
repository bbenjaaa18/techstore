import RegisterForm from '../components/Forms/RegisterForm';

const Register = ({ onPageChange }) => {
    return (
        <section id="registro" className="page-section active">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-user-plus"></i> Crear Cuenta
                </h2>
                <div className="form-container">
                    <RegisterForm onPageChange={onPageChange} />
                </div>
            </div>
        </section>
    );
};

export default Register;