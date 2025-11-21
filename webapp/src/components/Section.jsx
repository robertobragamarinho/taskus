import { tw } from "../tw"

export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={tw('py-24 sm:py-32', className)}>
      <div className={tw('max-w-6xl mx-auto px-6')}>
        {title && (
          <h2 className={tw('text-3xl sm:text-4xl font-bold tracking-tight mb-6')}>{title}</h2>
        )}
        {children}
      </div>
    </section>
  )
}
