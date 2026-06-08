interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export function MetricCard({ title, value, change, trend }: MetricCardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-red-600'
      : trend === 'down'
        ? 'text-green-600'
        : 'text-gray-500';

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
      </div>
    </div>
  );
}
