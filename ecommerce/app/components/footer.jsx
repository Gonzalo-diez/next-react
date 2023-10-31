const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-lg md:text-xl">
                    &copy; {new Date().getFullYear()} Mercado - Todos los derechos reservados
                </p>
                <div className="flex flex-col md:flex-row md:justify-center mt-4">
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300 mb-2 md:mb-0 mr-4">
                        Facebook
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300 mb-2 md:mb-0 mr-4">
                        Twitter
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300 mb-2 md:mb-0">
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
