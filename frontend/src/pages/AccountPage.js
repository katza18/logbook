import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyNavbar from "../components/MyNavbar";
import Button from 'react-bootstrap/Button';
import accountStore from '../stores/accountStore';
import Alert from 'react-bootstrap/Alert';

export default function AccountPage() {
    const units = accountStore((state) => state.units);
    const metric = accountStore((state) => state.metric);
    const imperial = accountStore((state) => state.imperial);
    const updated = accountStore((state) => state.updated);
    const setUpdated = accountStore((state) => state.setUpdated);
    const updateForm = accountStore((state) => state.updateForm);
    const updateAccount = accountStore((state) => state.updateAccount);
    const updateUpdateFormField = accountStore((state) => state.updateUpdateFormField);

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <h2>Account Settings:</h2>
                    <form onSubmit={(e) => {updateAccount(e); setUpdated(true)}}>
                        <div>Nutritional Goal:</div>
                        <select required name="goal" value={updateForm.goal} onChange={updateUpdateFormField}>
                            <option></option>
                            <option>Fat Loss</option>
                            <option>Weight Maintenance</option>
                            <option>Weight Gain</option>
                        </select>

                        <div>Biological Sex:</div>
                        <select required name="sex" value={updateForm.sex} onChange={updateUpdateFormField}>
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>

                        <div>Age:</div>
                        <input required name="age" type="number" value={updateForm.age} onChange={updateUpdateFormField} />

                        <div>Units:</div>
                        <label><input required type="radio" checked={updateForm.unit === "imperial"} name="unit" value="imperial" onChange={(e) => {imperial(); updateUpdateFormField(e)}}/>Imperial</label>
                        <label><input type="radio" checked={updateForm.unit === "metric"} name="unit" value="metric" onChange={(e) => {metric(); updateUpdateFormField(e)}}/>Metric</label>


                        <div>Height:</div>
                        <input required name="height" type="number" value={updateForm.height} onChange={updateUpdateFormField}/>
                        {units && units.localeCompare("metric") === 0 && <span>cm</span>}
                        {units && units.localeCompare("imperial") === 0 && <span>in</span>}

                        <div>Weight:</div>
                        <input required name="bodyweight" type="number" value={updateForm.bodyweight} onChange={updateUpdateFormField}/>
                        {units && units.localeCompare("metric") === 0 && <span>kg</span>}
                        {units && units.localeCompare("imperial") === 0 && <span>lb</span>}

                        <div>Activity Level:</div>
                        <select required name="activity" value={updateForm.activity} onChange={updateUpdateFormField}>
                            <option></option>
                            <option value="1.2">Not Active</option>
                            <option value="1.375">Somewhat Active (1-3 hours per week)</option>
                            <option value="1.55">Moderately Active (4-6 hours per week)</option>
                            <option value="1.725">Very Active (7-9 hours per week)</option>
                            <option value="1.9">Extremely Active (10+ hours per week)</option>
                        </select>

                        <div>
                            <Button type="submit">Update Settings</Button>
                        </div>
                        { updated &&
                        <div>
                            <Alert variant="success" onClose={() => setUpdated(false)} dismissible>
                            <Alert.Heading>Success</Alert.Heading>
                            <p> Your account has been updated. You can now find calorie and protein suggestions in your nutrition logs. </p>
                            </Alert>
                        </div> }

                    </form>
                </Col>
            </Row>
        </Container>
    );
}
