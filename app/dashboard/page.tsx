import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>Welcome to your dashboard. This is a protected route that requires authentication.</p>
      </div>
    </ProtectedRoute>
  )
}
