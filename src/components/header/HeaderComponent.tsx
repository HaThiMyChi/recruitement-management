import { Button, Container, Row } from "react-bootstrap";
import styles from "./HeaderComponent.module.css";

const HeaderComponent: React.FC = () => {
    return (
        <Container>
            <Row>
                <div className={styles.headerContainer}>
                    <img src="https://c.topdevvn.com/v4/assets/images/td-logo.png"></img>

                    <div>
                        <Button variant="danger">Đăng nhập</Button>
                    </div>
                </div>
            </Row>
        </Container>    )
}

export default HeaderComponent;