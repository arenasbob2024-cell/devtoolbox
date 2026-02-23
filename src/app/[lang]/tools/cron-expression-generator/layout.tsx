import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cron Expression Generator - Build Cron Job Schedules Online Free',
  description: 'Free online cron expression generator. Build and validate cron job schedules with an easy UI. Minute, hour, day, month, weekday selectors with human-readable output.',
  keywords: ['cron expression generator', 'cron job builder', 'cron schedule generator', 'cron syntax online', 'crontab generator', 'cron expression builder online'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
