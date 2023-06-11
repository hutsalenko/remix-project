import expensesStyles from '../../styles/expenses.css';
import { Outlet } from '@remix-run/react';
import ExpensesHeader from '../../components/navigation/ExpensesHeader';

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];

export default function ExpensesAppLayout() {
    return (
        <>
            <ExpensesHeader />
            <Outlet />;
        </>
    );
}
