import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="flex justify-between items-center py-4 sm:px-8 bg-gradient-to-r from-rose-400 to-rose-500">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link className='hover:no-underline' href="/">
                            <span className="hover:font-extrabold text-2xl font-bold text-white">Mingle</span>
                        </Link>
                        <p className="mt-4 text-gray-300">
                            We are Mingle, a dating site that connects people from all over the world. Our goal is to create a safe and enjoyable space where people can find their perfect match.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Contacts</h2>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <span className="hover:font-extrabold text-gray-300">Phone:</span>{" "}
                                <span href="tel:850-123-5021" className="text-white hover:text-gray-400">
                                    850-123-5021
                                </span>
                            </li>
                            <li>
                                <span className="hover:font-extrabold text-gray-300">Email:</span>{" "}
                                <span href="mailto:info@mingle.com" className="text-white hover:text-gray-400">
                                    info@mingle.com
                                </span>
                            </li>
                            <li>
                                <span className="hover:font-extrabold text-gray-300">Address:</span>{" "}
                                <span
                                    href="https://www.google.com/maps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-gray-400"
                                >
                                    312 Lovely Street, NY
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Follow Us</h2>
                        <ul className="mt-4 ">
                            <li>
                                <Link className='hover:no-underline' href="/">
                                    <span className="hover:font-extrabold text-white hover:text-gray-400">Facebook</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='hover:no-underline' href="/">
                                    <span className="hover:font-extrabold text-white hover:text-gray-400">Twitter</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='hover:no-underline' href="/">
                                    <span className="hover:font-extrabold text-white hover:text-gray-400">Instagram</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">About</h2>
                        <p className="mt-4 text-gray-300">
                            Mingle is a leading dating site that aims to bring people together and foster meaningful connections. With our advanced features and dedicated team, we strive to provide the best dating experience for our users.
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
                    <p className="text-gray-300">
                        © 2023 Mingle. All rights reserved.
                    </p>
                    <ul className="flex space-x-4">
                        <li>
                            <Link className='hover:no-underline' href="/privacy">
                                <span className="hover:font-extrabold text-white hover:text-gray-400">Privacy Policy</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='hover:no-underline' href="/terms">
                                <span className="hover:font-extrabold text-white hover:text-gray-400">Terms &amp; Conditions</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='hover:no-underline' href="/contact">
                                <span className="hover:font-extrabold text-white hover:text-gray-400">Contact</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
