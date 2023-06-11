import { getExpenses } from '../data/expenses.server';
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { json } from '@remix-run/node';
import Error from '../../components/util/Error';
import Chart from '../../components/expenses/Chart';
import ExpensesStatistics from '../../components/expenses/ExpenseStatistics';
import { requireUserSession } from '../data/auth.server';

export default function ExpensesAnalysisPage() {
    const expenses = useLoaderData();

    return (
        <main>
            <Chart expenses={expenses} />
            <ExpensesStatistics expenses={expenses} />
        </main>
    );
}

export async function loader({ request }) {
    const userId = await requireUserSession(request);

    const expenses = await getExpenses(userId);

    if (!expenses || expenses.length === 0) {
        throw json({ message: 'Could not load expenses' }, { status: 404, statusText: 'Expenses not found' });
    }

    return expenses;
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <Error title={error.statusText}>
                    <p>{error.data?.message || 'Something went wrong could not load expenses'}</p>
                </Error>
            </main>
        );
    }
}
