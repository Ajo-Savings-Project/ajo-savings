export interface UsersAttributes {
  firstName: string
  lastName: string
  id: string
  email: string
  profilePic?: string
  password: string
  role: string
  phone: string
  gender?: string
  occupation?: string
  date_of_birth?: Date
  bvn?: string | null
  address?: string
  identification_number?: string
  identification_doc?: string
  proof_of_address_doc?: string
  otp?: string
  otp_expiry?: Date
  isVerified: boolean
  resetToken?: string
  resetTokenExpires?: Date
  createdAt?: Date
  updatedAt?: Date
}
