export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-pulse">
          <div className="h-10 bg-card rounded-lg w-48 mb-2"></div>
          <div className="h-4 bg-card rounded-lg w-96"></div>
        </div>
        <div className="grid grid-cols-5 gap-4 mb-8 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-card rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
