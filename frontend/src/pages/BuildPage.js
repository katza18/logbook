import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyNavbar from "../components/MyNavbar";

export default function BuildPage() {
    return (
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <h2>Program Builder</h2>
                    <div>Primary Weight Training Goal:</div>
                    <select>
                        <option selected disabled></option>
                        <option>Strength</option>
                        <option>Hypertrophy</option>
                        <option>Power</option>
                        <option>Muscular Endurance</option>
                    </select>
                    <div>Secondary Weight Training Goal (optional):</div>
                    <select>
                        <option selected disabled></option>
                        <option>Strength</option>
                        <option>Hypertrophy</option>
                        <option>Power</option>
                        <option>Muscular Endurance</option>
                        <option>None</option>
                    </select>
                    <div>Training days per week:</div>
                    <select>
                        <option selected disabled></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                    <div>Training Split:</div>
                    <select>
                        <option selected disabled></option>
                        <option>Body Parts</option>
                        <option>Push / Pull / Legs</option>
                        <option>Upper / Lower</option>
                        <option>Full Body</option>
                        <option>Olympic</option>
                    </select>

                    <div>Primary Exercises: </div>
                    <div>Assistance Exercises: </div>
                </Col>
            </Row>
        </Container>
    );
}
