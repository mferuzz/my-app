'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { categories } from '@/lib/constants'
import { formUrlQuery, removeUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { debounce } from 'lodash'

const Filter = () => {
	const searchparams = useSearchParams()
	const router = useRouter()

	const onFilterChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'filter',
			params: searchparams.toString(),
			value,
		})
		router.push(newUrl)
	}

	const onCategoryChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'category',
			params: searchparams.toString(),
			value,
		})
		router.push(newUrl)
	}

	const onInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const newUrl = formUrlQuery({
			key: 'q',
			params: searchparams.toString(),
			value,
		})
		router.push(newUrl)

		if (value === '') {
			const newUrl = removeUrlQuery({
				key: 'q',
				params: searchparams.toString(),
			})
			router.push(newUrl)
		}
	}

	const handleSearchDebounce = useCallback(debounce(onInputSearch, 500), [])

	return (
		<div className='gap-1 max-md:w-full grid grid-cols-3'>
			<div className='flex items-center bg-secondary max-md:w-1/2 border'>
				<Input
					placeholder='Qidirish'
					className='text-xs  bg-secondary border-none no-focus'
					onChange={handleSearchDebounce}
				/>
				<Search className='mr-2 cursor-pointer text-muted-foreground' />
			</div>

			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='bg-secondary text-xs max-md:w-1/2 no-focus'>
					<SelectValue
						placeholder='Select Filter'
						className='text-muted-foreground'
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='newest'>Newest</SelectItem>
					<SelectItem value='oldest'>Oldest</SelectItem>
				</SelectContent>
			</Select>

			<Select onValueChange={onCategoryChange}>
				<SelectTrigger className='bg-secondary text-xs max-md:w-1/2 no-focus'>
					<SelectValue
						placeholder='Select Category'
						className='text-muted-foreground'
					/>
				</SelectTrigger>
				<SelectContent>
					{categories.map(category => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default Filter
