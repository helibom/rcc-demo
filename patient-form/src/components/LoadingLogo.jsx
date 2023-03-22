import Logo from '../assets/Logo.png'
import '../styles/LoadingLogo.css'

const LoadingLogo = () => {
    return (
        <>
            <img src={Logo} className='logo'/>
        </>                
    );
}

export default LoadingLogo