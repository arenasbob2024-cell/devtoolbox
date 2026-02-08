import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cron Expression Parser | DevToolBox',
  description: 'Free online cron expression parser. Parse and explain cron expressions with next run times. Perfect for understanding scheduled tasks, cron jobs, and time-based automation. No signup required.',
  keywords: ['cron parser', 'cron expression', 'cron schedule', 'cron job parser', 'cron expression parser', 'parse cron', 'cron validator', 'cron online', 'cron expression checker'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
