import Table from 'react-bootstrap/Table';

export default function ExercisesStats({reps, sets}) {
    return(
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>Total Reps</th>
                <th>Total Sets</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{reps}</td>
                    <td>{sets}</td>
                </tr>
            </tbody>
        </Table>
    );
}
