import NavLink from "./navlink";

export default function SideBar({ children }: { children: React.ReactNode }) {
    return (
        <div className="container-fluid overflow-hidden">
            <div className="row vh-100 overflow-auto">
                <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
                    <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                        <NavLink href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5"><i className="bi-basket me-2"></i><span className="d-none d-sm-inline">Smarter Grocy</span></span>
                        </NavLink>
                        <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <NavLink href="/products" className="nav-NavLink px-sm-0 px-2">
                                    <i className="fs-5 bi-box"></i><span className="ms-1 d-none d-sm-inline">Products</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/purchase" data-bs-toggle="collapse" className="nav-NavLink px-sm-0 px-2">
                                    <i className="fs-5 bi-cart"></i><span className="ms-1 d-none d-sm-inline">Purchase</span> </NavLink>
                            </li>
                            <li>
                                <NavLink href="/shopping" className="nav-NavLink px-sm-0 px-2">
                                    <i className="fs-5 bi-list-task"></i><span className="ms-1 d-none d-sm-inline">Shopping List</span></NavLink>
                            </li>
                            <li>
                                <NavLink href="/recipes" className="nav-NavLink px-sm-0 px-2">
                                    <i className="fs-5 bi-receipt"></i><span className="ms-1 d-none d-sm-inline">Recipes</span></NavLink>
                            </li>
                        </ul>
                        <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle"/>
                                <span className="d-none d-sm-inline mx-1">Joe</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><NavLink className="dropdown-item" href="#">New project...</NavLink></li>
                                <li><NavLink className="dropdown-item" href="#">Settings</NavLink></li>
                                <li><NavLink className="dropdown-item" href="#">Profile</NavLink></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><NavLink className="dropdown-item" href="#">Sign out</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col d-flex flex-column h-100">
                    <main className="row p-3">
                        {children}
                    </main>
                    <footer className="row bg-light py-4 mt-auto">
                        <div className="col"> SmarterGrocy developed by @alkuzman </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}