import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const styles = {
  root: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    background: '#0d0f14',
    minHeight: '100vh',
    color: '#e8eaf0',
    padding: '32px',
  },
  pageHeader: {
    marginBottom: '36px',
  },
  pageHeaderH1: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: "'Syne', 'Georgia', serif",
    letterSpacing: '-0.5px',
    color: '#f0f2f8',
    margin: '0 0 4px 0',
  },
  pageHeaderP: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '28px',
  },
  statCard: (accent) => ({
    background: '#13151c',
    border: `1px solid ${accent}28`,
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: `0 0 0 0 ${accent}`,
    transition: 'box-shadow 0.2s',
    cursor: 'default',
  }),
  statIcon: (accent) => ({
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: `${accent}18`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
    border: `1px solid ${accent}30`,
  }),
  statValue: (accent) => ({
    display: 'block',
    fontSize: '26px',
    fontWeight: '700',
    fontFamily: "'Syne', serif",
    color: accent,
    lineHeight: 1,
  }),
  statLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
    fontWeight: '500',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },
  dashRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  card: {
    background: '#13151c',
    border: '1px solid #1e2130',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  cardDanger: {
    background: '#13151c',
    border: '1px solid #ff444420',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '18px 22px 14px',
    borderBottom: '1px solid #1e2130',
  },
  cardHeaderH3: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: '18px 22px',
  },
  taskBarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  barLabel: {
    fontSize: '13px',
    color: '#9ca3af',
    width: '80px',
    flexShrink: 0,
  },
  barTrack: {
    flex: 1,
    height: '6px',
    background: '#1e2130',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  barFill: (color, width) => ({
    height: '100%',
    width,
    background: color,
    borderRadius: '99px',
    transition: 'width 0.6s ease',
  }),
  barCount: {
    fontSize: '13px',
    color: '#6b7280',
    width: '24px',
    textAlign: 'right',
    flexShrink: 0,
  },
  miniTask: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #1a1d26',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  miniTaskInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  miniTaskTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#e2e5ee',
  },
  miniMeta: {
    fontSize: '12px',
    color: '#6b7280',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  taskStatusIcon: (color) => ({
    fontSize: '14px',
    color,
    flexShrink: 0,
    width: '18px',
    textAlign: 'center',
  }),
  taskInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
  },
  taskTitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#d1d5e0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  taskMeta: {
    fontSize: '12px',
    color: '#6b7280',
  },
  badge: (bg, text) => ({
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '5px',
    background: bg,
    color: text,
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    flexShrink: 0,
  }),
  emptyText: {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    padding: '16px 0',
    margin: 0,
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#0d0f14',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #1e2130',
    borderTop: '3px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  errorMsg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#ff6b6b',
    fontSize: '14px',
    background: '#0d0f14',
  },
};

const ACCENTS = {
  purple: '#a78bfa',
  blue: '#60a5fa',
  green: '#34d399',
  orange: '#fb923c',
};

const PRIORITY_BADGE = {
  low: { bg: '#1a2e1a', text: '#4ade80' },
  medium: { bg: '#2a2510', text: '#facc15' },
  high: { bg: '#2e1a1a', text: '#f87171' },
  urgent: { bg: '#ff000018', text: '#ff4444' },
};

const STATUS_COLOR = {
  todo: '#6b7280',
  'in-progress': '#60a5fa',
  review: '#a78bfa',
  done: '#34d399',
};

const STATUS_BADGE = {
  todo: { bg: '#1e2130', text: '#9ca3af' },
  'in-progress': { bg: '#1a2535', text: '#60a5fa' },
  review: { bg: '#1e1a35', text: '#a78bfa' },
  done: { bg: '#122520', text: '#34d399' },
};

const BAR_COLORS = {
  'To Do': '#4b5563',
  'In Progress': '#60a5fa',
  'Review': '#a78bfa',
  'Done': '#34d399',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { api.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false)); }, []);

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';
  const statusLabel = { todo: 'To Do', 'in-progress': 'In Progress', review: 'Review', done: 'Done' };

  if (loading) return (
    <div style={styles.loader}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={styles.spinner} />
    </div>
  );
  if (!data) return <div style={styles.errorMsg}>Failed to load dashboard</div>;

  const s = data.stats;
  const pct = s.totalTasks ? Math.round((s.doneTasks / s.totalTasks) * 100) : 0;

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={styles.pageHeader}>
        <h1 style={styles.pageHeaderH1}>Dashboard</h1>
        <p style={styles.pageHeaderP}>Welcome back, {user?.name}</p>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'Projects', value: s.projects, icon: '📁', accent: ACCENTS.purple },
          { label: 'Total Tasks', value: s.totalTasks, icon: '📋', accent: ACCENTS.blue },
          { label: 'Completed', value: `${pct}%`, icon: '✅', accent: ACCENTS.green },
          { label: 'Team', value: s.teamMembers, icon: '👥', accent: ACCENTS.orange },
        ].map(({ label, value, icon, accent }) => (
          <div key={label} style={styles.statCard(accent)}>
            <div style={styles.statIcon(accent)}>{icon}</div>
            <div>
              <span style={styles.statValue(accent)}>{value}</span>
              <span style={styles.statLabel}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.dashRow}>
        <div style={styles.card}>
          <div style={styles.cardHeader}><h3 style={styles.cardHeaderH3}>Task Breakdown</h3></div>
          <div style={styles.cardBody}>
            {[['To Do', s.todoTasks], ['In Progress', s.inProgressTasks], ['Review', s.reviewTasks], ['Done', s.doneTasks]].map(([label, count]) => (
              <div style={styles.taskBarItem} key={label}>
                <span style={styles.barLabel}>{label}</span>
                <div style={styles.barTrack}>
                  <div style={styles.barFill(BAR_COLORS[label], `${s.totalTasks ? (count / s.totalTasks) * 100 : 0}%`)} />
                </div>
                <span style={styles.barCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.cardDanger}>
          <div style={styles.cardHeader}><h3 style={styles.cardHeaderH3}>⚠️ Overdue Tasks</h3></div>
          <div style={styles.cardBody}>
            {data.overdueTasks.length === 0
              ? <p style={styles.emptyText}>No overdue tasks 🎉</p>
              : data.overdueTasks.map(t => (
                <div style={styles.miniTask} key={t.id} onClick={() => navigate(`/projects/${t.project_id}`)}>
                  <div style={styles.miniTaskInfo}>
                    <strong style={styles.miniTaskTitle}>{t.title}</strong>
                    <span style={styles.miniMeta}>{t.project_name} · Due {fmt(t.due_date)}</span>
                  </div>
                  <span style={styles.badge(PRIORITY_BADGE[t.priority]?.bg, PRIORITY_BADGE[t.priority]?.text)}>{t.priority}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}><h3 style={styles.cardHeaderH3}>Recent Activity</h3></div>
        <div style={styles.cardBody}>
          {data.recentTasks.length === 0
            ? <p style={styles.emptyText}>No tasks yet. Create a project to get started!</p>
            : <div style={styles.taskList}>
              {data.recentTasks.map(t => (
                <div style={styles.taskRow} key={t.id} onClick={() => navigate(`/projects/${t.project_id}`)}>
                  <div style={styles.taskStatusIcon(STATUS_COLOR[t.status])}>
                    {{ todo: '○', 'in-progress': '◐', review: '◑', done: '●' }[t.status]}
                  </div>
                  <div style={styles.taskInfo}>
                    <span style={styles.taskTitle}>{t.title}</span>
                    <span style={styles.taskMeta}>{t.project_name}{t.assignee_name ? ` · ${t.assignee_name}` : ''}</span>
                  </div>
                  <span style={styles.badge(PRIORITY_BADGE[t.priority]?.bg, PRIORITY_BADGE[t.priority]?.text)}>{t.priority}</span>
                  <span style={styles.badge(STATUS_BADGE[t.status]?.bg, STATUS_BADGE[t.status]?.text)}>{statusLabel[t.status]}</span>
                </div>
              ))}
            </div>}
        </div>
      </div>
    </div>
  );
}
