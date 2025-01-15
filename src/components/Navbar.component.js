const Navbar = () => {
    return (
        <nav className="bg-gray-700 text-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <a href="#" className="text-xl font-bold">Logo</a>
                <ul className="flex space-x-6">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">About</a></li>
                    <li><a href="#" className="hover:underline">Services</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
