// User service to handle user data operations
interface User {
  email: string
  name: string
  password: string
  balance: number
  status: string
  joined: string
  transactions?: Transaction[]
  investments?: Investment[]
}

interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  currency: string
  status: "pending" | "completed" | "rejected"
  date: string
  method: string
}

interface Investment {
  id: string
  plan: string
  amount: number
  profit: number
  duration: string
  startDate: string
  endDate: string
  status: "active" | "completed"
}

// Get all registered users
export function getRegisteredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  } catch (error) {
    console.error("Error getting registered users:", error)
    return []
  }
}

// Get user by email
export function getUserByEmail(email: string): User | null {
  const users = getRegisteredUsers()
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
}

// Save user data
export function saveUser(user: User): void {
  try {
    const users = getRegisteredUsers()
    const existingUserIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase())

    if (existingUserIndex >= 0) {
      // Update existing user
      users[existingUserIndex] = { ...users[existingUserIndex], ...user }
    } else {
      // Add new user
      users.push(user)
    }

    localStorage.setItem("registeredUsers", JSON.stringify(users))
  } catch (error) {
    console.error("Error saving user:", error)
  }
}

// Update user balance
export function updateUserBalance(email: string, amount: number): void {
  try {
    const users = getRegisteredUsers()
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())

    if (userIndex >= 0) {
      users[userIndex].balance = (users[userIndex].balance || 0) + amount
      localStorage.setItem("registeredUsers", JSON.stringify(users))

      // Also update current user if it's the logged in user
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
      if (currentUser.email?.toLowerCase() === email.toLowerCase()) {
        currentUser.balance = users[userIndex].balance
        localStorage.setItem("user", JSON.stringify(currentUser))
      }
    }
  } catch (error) {
    console.error("Error updating user balance:", error)
  }
}

// Add transaction to user
export function addTransaction(email: string, transaction: Transaction): void {
  try {
    const users = getRegisteredUsers()
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())

    if (userIndex >= 0) {
      if (!users[userIndex].transactions) {
        users[userIndex].transactions = []
      }

      users[userIndex].transactions.push(transaction)
      localStorage.setItem("registeredUsers", JSON.stringify(users))
    }
  } catch (error) {
    console.error("Error adding transaction:", error)
  }
}

// Add investment to user
export function addInvestment(email: string, investment: Investment): void {
  try {
    const users = getRegisteredUsers()
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())

    if (userIndex >= 0) {
      if (!users[userIndex].investments) {
        users[userIndex].investments = []
      }

      users[userIndex].investments.push(investment)
      localStorage.setItem("registeredUsers", JSON.stringify(users))
    }
  } catch (error) {
    console.error("Error adding investment:", error)
  }
}

// Get user transactions
export function getUserTransactions(email: string): Transaction[] {
  const user = getUserByEmail(email)
  return user?.transactions || []
}

// Get user investments
export function getUserInvestments(email: string): Investment[] {
  const user = getUserByEmail(email)
  return user?.investments || []
}
