import { useEffect, useState } from "react"

import { Like, SubscribedSubReddits, Vote } from "@/utils/types"

export const useSibscribeSubReddit = (
	SubscribedSubReddits: SubscribedSubReddits[],
	subRedditId: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		setIsSubscribed(
			!!(SubscribedSubReddits && SubscribedSubReddits?.some((item) => item.subRedditId === subRedditId))
		)
	}, [SubscribedSubReddits, subRedditId])

	return [isSubscribed, setIsSubscribed]
}

export const useLikeComment = (
	Likes: Like[],
	commentId: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, { id: number }] => {
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [likeData, setLikeData] = useState({ id: 0 })
	useEffect(() => {
		const like = Likes?.filter((item) => item.commentId === commentId)[0]
		setIsSubscribed(!!like)
		setLikeData(like)
	}, [Likes, commentId])

	return [isSubscribed, setIsSubscribed, likeData]
}

export const useVote = (
	Vote: Vote[],
	postId: number
): [boolean | null, React.Dispatch<React.SetStateAction<boolean>>, { id: number }] => {
	const [vote, setVote] = useState<boolean | null>(null)
	const [voteData, setVoteData] = useState({ id: 0 })
	useEffect(() => {
		const vote = Vote?.filter((item) => item.postId === postId)[0]
		setVote(vote?.value ?? null)
		setVoteData(vote)
	}, [Vote, postId, voteData])

	return [vote, setVote, voteData]
}