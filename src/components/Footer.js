import { useLocation } from 'react-router-dom'

const Footer = () => {
    const loc = useLocation()

    return (
        <footer className="footer footer-center p-4 bg-gray-50 text-base-content bottom-0">
            <div>
                <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
            </div>
        </footer>
    );
}
 
export default Footer;