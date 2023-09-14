import Animation from './lottie.jsx'

function Nav() {
    return (
        <nav className="navbar">
            <div className="container mt-2 custom-container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="order-lg-1">
                        <a className="navbar-brand fs-1 text-white" asp-area="" asp-page="/Index">Bonkkers </a> 
                       
                    </div>
                    
                </div>
            </div>
        </nav>
    );
}

export default Nav;
