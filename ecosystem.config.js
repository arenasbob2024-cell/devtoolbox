module.exports = {
  apps: [{
    name: 'devtoolbox',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/devtoolbox',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    max_memory_restart: '512M',
    restart_delay: 5000,
    max_restarts: 10,
    min_uptime: '10s',
    exp_backoff_restart_delay: 100
  }]
};
