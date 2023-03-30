import mealsStore from '../stores/mealsStore';
import Accordion from 'react-bootstrap/Accordion';

export default function MealsDateHeader({date}) {
    const store = mealsStore(store => {
        return {
            meals: store.meals
        }
    });

    return (
        <Accordion.Header>
            {date.substring(5,10)}
        </Accordion.Header>
    );
}
