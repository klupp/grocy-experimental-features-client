import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <i className="fs-4 bi-basket mx-2"></i>
                    Smarter Grocy
                </Link>
            </div>
        </nav>
    )
}