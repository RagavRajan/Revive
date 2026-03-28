interface Props {
  onDismiss: () => void
}

export function ReminderBanner({ onDismiss }: Props) {
  return (
    <div className="reminder-banner">
      <span>You haven't checked in yet today!</span>
      <button className="reminder-dismiss" onClick={onDismiss}>&times;</button>

      <style>{`
        .reminder-banner {
          background: rgba(255, 152, 0, 0.15);
          border-bottom: 1px solid rgba(255, 152, 0, 0.3);
          color: #ff9800;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .reminder-dismiss {
          font-size: 1.2rem;
          color: #ff9800;
          padding: 4px 8px;
          border-radius: var(--radius);
        }
        .reminder-dismiss:hover {
          background: rgba(255, 152, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
