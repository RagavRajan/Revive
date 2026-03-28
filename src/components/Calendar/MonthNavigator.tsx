interface Props {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function MonthNavigator({ year, month, onPrev, onNext }: Props) {
  return (
    <div className="month-nav">
      <button className="month-nav-btn" onClick={onPrev}>&larr;</button>
      <span className="month-nav-label">{MONTH_NAMES[month]} {year}</span>
      <button className="month-nav-btn" onClick={onNext}>&rarr;</button>

      <style>{`
        .month-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          margin-bottom: 16px;
        }
        .month-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          background: var(--color-surface);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition);
        }
        .month-nav-btn:hover {
          background: var(--color-surface-hover);
        }
        .month-nav-label {
          font-weight: 600;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  )
}
