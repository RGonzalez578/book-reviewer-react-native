export interface Book {
	_id: string
	title: string
	author: string
	authors: string[]
	isbn: string
	isbn13: string
	genres: string[]
	publisher: string
	language: string
	coverImage: string
	averageRating: number
	ratingsCount: number
	reviews: any[]
	isActive: boolean
	createdAt: string
	updatedAt: string
	__v: number
}