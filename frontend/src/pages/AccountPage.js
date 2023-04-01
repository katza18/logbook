import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyNavbar from "../components/MyNavbar";
import { create } from 'zustand'

const accountStore = create((set) => ({
    units: "",
    imperial: () => set({units: "imperial"}),
    metric: () => set({units: "metric"})
  }))

export default function AccountPage() {

    const units = accountStore((state) => state.units);
    const metric = accountStore((state) => state.metric);
    const imperial = accountStore((state) => state.imperial);

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <h2>Account Settings:</h2>
                    <form>
                        <div>Nutritional Goal:</div>
                        <select>
                            <option></option>
                            <option>Fat Loss</option>
                            <option>Weight Maintenance</option>
                            <option>Weight Gain</option>
                        </select>

                        <div>Biological Sex:</div>
                        <select>
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>

                        <div>Units:</div>
                        <input type="radio" name="unit" value="imperial" id="imperial" onChange={imperial}/>
                        <label htmlFor="imperial">Imperial</label>
                        <input type="radio" name="unit" value="metric" id="metric" onChange={metric}/>
                        <label htmlFor="metric">Metric</label>

                        <div>Height:</div>
                        <input type="number" />
                        {units && units.localeCompare("metric") === 0 && <span>cm</span>}
                        {units && units.localeCompare("imperial") === 0 && <span>in</span>}

                        <div>Weight:</div>
                        <input type="number" />
                        {units && units.localeCompare("metric") === 0 && <span>kg</span>}
                        {units && units.localeCompare("imperial") === 0 && <span>lb</span>}
                    </form>
                </Col>
            </Row>
        </Container>
    );
}
