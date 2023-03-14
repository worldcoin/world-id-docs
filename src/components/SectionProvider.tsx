import { createStore, StoreApi, useStore } from 'zustand'
import {
	createContext,
	FC,
	PropsWithChildren,
	RefObject,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react'

import { remToPx } from '@/lib/remToPx'

export type Section = {
	id: string
	tag: 'get' | 'post' | 'put' | 'delete'
	title: string
	headingRef?: RefObject<HTMLHeadingElement>
	offsetRem?: number
}

export type SectionStore = {
	sections: Section[]
	visibleSections: string[]
	setVisibleSections: (visibleSections: string[]) => void
	registerHeading: ({
		id,
		ref,
		offsetRem,
	}: {
		id: string
		ref: RefObject<HTMLHeadingElement>
		offsetRem: number
	}) => void
}

const createSectionStore = (sections: Section[]): StoreApi<SectionStore> => {
	return createStore(set => ({
		sections,
		visibleSections: [],
		setVisibleSections: visibleSections =>
			set(state => (state.visibleSections.join() === visibleSections.join() ? {} : { visibleSections })),
		registerHeading: ({ id, ref, offsetRem }) =>
			set(state => {
				return {
					sections: state.sections.map(section => {
						if (section.id === id) {
							return {
								...section,
								headingRef: ref,
								offsetRem,
							}
						}
						return section
					}),
				}
			}),
	}))
}

const useVisibleSections = (sectionStore: StoreApi<SectionStore>) => {
	let setVisibleSections = useStore(sectionStore, s => s.setVisibleSections)
	let sections = useStore(sectionStore, s => s.sections)

	useEffect(() => {
		function checkVisibleSections() {
			let { innerHeight, scrollY } = window
			let newVisibleSections = []

			for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
				let { id, headingRef, offsetRem } = sections[sectionIndex]
				let offset = remToPx(offsetRem)
				// @ts-ignore
				let top = headingRef?.current?.getBoundingClientRect()?.top + scrollY

				if (sectionIndex === 0 && top - offset > scrollY) {
					newVisibleSections.push('_top')
				}

				let nextSection = sections[sectionIndex + 1]
				let bottom =
					(nextSection?.headingRef?.current?.getBoundingClientRect()?.top ?? Infinity) +
					scrollY -
					remToPx(nextSection?.offsetRem ?? 0)

				if (
					(top > scrollY && top < scrollY + innerHeight) ||
					(bottom > scrollY && bottom < scrollY + innerHeight) ||
					(top <= scrollY && bottom >= scrollY + innerHeight)
				) {
					newVisibleSections.push(id)
				}
			}

			setVisibleSections(newVisibleSections)
		}

		let raf = window.requestAnimationFrame(() => checkVisibleSections())
		window.addEventListener('scroll', checkVisibleSections, { passive: true })
		window.addEventListener('resize', checkVisibleSections)

		return () => {
			window.cancelAnimationFrame(raf)
			window.removeEventListener('scroll', checkVisibleSections)
			window.removeEventListener('resize', checkVisibleSections)
		}
	}, [setVisibleSections, sections])
}

const SectionStoreContext = createContext<StoreApi<SectionStore> | null>(null)

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const SectionProvider: FC<
	PropsWithChildren<{
		sections: Section[]
	}>
> = ({ sections, children }) => {
	let [sectionStore] = useState(() => createSectionStore(sections))

	useVisibleSections(sectionStore)

	useIsomorphicLayoutEffect(() => {
		sectionStore.setState({ sections })
	}, [sectionStore, sections])

	return <SectionStoreContext.Provider value={sectionStore}>{children}</SectionStoreContext.Provider>
}

export const useSectionStore = <T,>(selector: (state: SectionStore) => T): T => {
	let store = useContext(SectionStoreContext)

	return useStore(store!, selector)
}
