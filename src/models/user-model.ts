export interface UserModel {
  id: number,
  name: string,
  email: string,
  favorites?: number[]
}