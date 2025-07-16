import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/header/HeaderComponent";
import NavbarComponent from "../components/navbar/NavbarComponent";

const HomeComponent: React.FC = () => {
    return (
        <>
            <HeaderComponent />
            <NavbarComponent />
            <Outlet />
        </>
    )
}

export default HomeComponent;