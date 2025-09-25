const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export interface AuthResponse {
  user_id?: number
  token?: string
}

export interface CostSheet {
  id: number
  user_id: number
  sheet_name: string
  tour_place: string
  total_amount: number
  currency: string
  status: string
  notes: string
  created_at: string
  updated_at: string
}

export interface Cost {
  id: number
  user_id: number
  cost_sheet_id: number
  cost_type: string
  cost_description: string
  amount: number
  cost_date: string
  created_at: string
  updated_at: string
}

export interface CreateCostSheetRequest {
  sheet_name: string
  tour_place: string
  currency: string
  status: string
  notes: string
}

export interface CreateCostRequest {
  cost_sheet_id: number
  cost_type: string
  cost_description: string
  amount: number
  cost_date: string
}

class ApiService {
  private authListeners: (() => void)[] = []

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  onAuthChange(callback: () => void) {
    this.authListeners.push(callback)
    return () => {
      this.authListeners = this.authListeners.filter(listener => listener !== callback)
    }
  }

  private notifyAuthChange() {
    this.authListeners.forEach(callback => callback())
  }

  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (!response.ok) {
      throw new Error('Registration failed')
    }
    
    return response.json()
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (!response.ok) {
      throw new Error('Login failed')
    }
    
    const data = await response.json()
    
    if (data.token) {
      localStorage.setItem('auth_token', data.token)
      this.notifyAuthChange()
    }
    
    return data
  }

  async createCostSheet(data: CreateCostSheetRequest): Promise<{ id: number }> {
    const response = await fetch(`${API_BASE_URL}/api/sheets`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create cost sheet')
    }
    
    return response.json()
  }

  async getCostSheets(): Promise<CostSheet[]> {
    const response = await fetch(`${API_BASE_URL}/api/sheets/list`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch cost sheets')
    }
    
    return response.json()
  }

  async getCostsByCostSheet(costSheetId: number): Promise<Cost[]> {
    const response = await fetch(`${API_BASE_URL}/api/costs/list?cost_sheet_id=${costSheetId}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch costs')
    }
    
    return response.json()
  }

  async createCost(data: CreateCostRequest): Promise<{ id: number }> {
    const response = await fetch(`${API_BASE_URL}/api/costs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create cost')
    }
    
    return response.json()
  }

  logout() {
    localStorage.removeItem('auth_token')
    this.notifyAuthChange()
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  }
}

export const apiService = new ApiService()