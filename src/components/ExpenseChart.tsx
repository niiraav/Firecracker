import React, { useMemo } from 'react';
import { Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from './financialTypes';

const { Title, Text } = Typography;

interface ExpenseChartProps {
  transactions: Transaction[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const chartData = useMemo(() => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const dailyExpenses: { [key: string]: { [category: string]: number } } = {};
    const categoryTotals: { [key: string]: number } = {};
    const lastMonthCategoryTotals: { [key: string]: number } = {};

    transactions.forEach(transaction => {
      if (transaction.date >= firstDayOfMonth && transaction.date <= lastDayOfMonth && transaction.type === 'expense') {
        const dayKey = transaction.date.toLocaleDateString('en-US', { weekday: 'short' });
        if (!dailyExpenses[dayKey]) {
          dailyExpenses[dayKey] = {};
        }
        if (!dailyExpenses[dayKey][transaction.category]) {
          dailyExpenses[dayKey][transaction.category] = 0;
        }
        dailyExpenses[dayKey][transaction.category] += Math.abs(transaction.amount);

        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += Math.abs(transaction.amount);
      }

      // Calculate last month's totals for comparison
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      if (transaction.date >= lastMonth && transaction.date < firstDayOfMonth && transaction.type === 'expense') {
        if (!lastMonthCategoryTotals[transaction.category]) {
          lastMonthCategoryTotals[transaction.category] = 0;
        }
        lastMonthCategoryTotals[transaction.category] += Math.abs(transaction.amount);
      }
    });

    const chartData = Object.entries(dailyExpenses).map(([day, categories]) => ({
      day,
      ...categories,
    }));

    return {
      chartData,
      categoryTotals,
      lastMonthCategoryTotals,
    };
  }, [transactions]);

  const categories = Object.keys(chartData.categoryTotals);
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

  return (
    <Card title="Expense this month" extra={<span>Filter</span>}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {categories.map((category, index) => (
            <Bar key={category} dataKey={category} stackId="a" fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      {categories.map((category, index) => {
        const currentTotal = chartData.categoryTotals[category];
        const lastMonthTotal = chartData.lastMonthCategoryTotals[category] || 0;
        const percentChange = ((currentTotal - lastMonthTotal) / lastMonthTotal) * 100;
        const changeText = percentChange > 0 ? 
          <Text type="danger">{`+${percentChange.toFixed(0)}% Last Month`}</Text> :
          <Text type="success">{`${percentChange.toFixed(0)}% Last Month`}</Text>;

        return (
          <div key={category}>
            <Text strong style={{ color: colors[index % colors.length] }}>
              {`${category} ($${currentTotal.toFixed(2)})`}
            </Text>
            {' '}
            {changeText}
          </div>
        );
      })}
    </Card>
  );
};

export default ExpenseChart;