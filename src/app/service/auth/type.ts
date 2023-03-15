export interface User {
	name: string
	email: string
}

export interface UserResponse {
	status: boolean;
	user: User;
	errors?: string;
}

export interface LoginRequest {
	email: string
	password: string
}