export interface ChildProps {
	children: React.ReactNode
}

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}
export interface IProduct {
	_id: string
	title: string
	category: string
	price: number
	image: string
	excerpt: string
}
