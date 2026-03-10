// This function sets up demo data for testing purposes
export function setupDemoData() {
  const existingUsers = localStorage.getItem('nour_users')
  
  // Only set up demo data if no users exist
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        email: 'demo@nour.com',
        password: 'demo123',
        name: 'Demo User'
      },
      {
        id: '2',
        email: 'test@nour.com',
        password: 'test123',
        name: 'Test User'
      }
    ]
    
    localStorage.setItem('nour_users', JSON.stringify(demoUsers))
  }
}

// Call this on app initialization
if (typeof window !== 'undefined') {
  setupDemoData()
}
