import { MetricCard } from '@/components/MetricCard';

const metrics = [
  { title: 'Transactions Today', value: '12,847', change: '+3.2%', trend: 'up' as const },
  { title: 'Pending Reviews', value: '23', change: '-12%', trend: 'down' as const },
  { title: 'Failed Exports', value: '3', change: '+2', trend: 'up' as const },
  { title: 'Active Alerts', value: '7', change: '0', trend: 'neutral' as const },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Operations overview for today</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <p className="mt-2 text-sm text-gray-500">No critical incidents in the last 24 hours.</p>
          {/* TODO: Add real-time activity feed */}
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">System Health</h2>
          <p className="mt-2 text-sm text-gray-500">All services operational.</p>
          {/* TODO: Integrate with monitoring service */}
        </div>
      </div>
    </div>
  );
}
