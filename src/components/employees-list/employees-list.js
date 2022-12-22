import './employees-list.css';
import EmployeesListItem from '../employees-list-item/employees-list-item';

const EmployeesList = ({data, onDelete, onToggleIncrease, onToggleRise}) => {

    const elements = data.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
            onToggleIncrease={() => this.onToggleIncrease(id)}
            onToggleRise={() => this.onToggleRise(id)} /> /* name={item.name} salary={item.salary} */
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;