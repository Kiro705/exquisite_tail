import axios from 'axios'

/**
 * ACTION TYPES
 */
const STORY_SUCCESS = 'STORY_SUCCESS'
const STORY_NO_TITLE = 'STORY_NO_TITLE'
const STORY_TOO_FEW_CHAPTERS = 'STORY_TOO_FEW_CHAPTERS'
const STORY_TOO_FEW_CHARACTERS = 'STORY_TOO_FEW_CHARACTERS'
const RESET_STORY_MESSAGE = 'RESET_STORY_MESSAGE'

/**
 * INITIAL STATE
 */
const storyMessage = {
	result: null
}

/**
 * ACTION CREATORS
 */

export const storySuccessAction = () => ({type: STORY_SUCCESS})
export const noTitleAction = () => ({type: STORY_NO_TITLE})
export const tooFewChaptersAction = () => ({type: STORY_TOO_FEW_CHAPTERS})
export const tooFewCharactersAction = () => ({type: STORY_TOO_FEW_CHARACTERS})
export const resetStoryMessage = () => ({type: RESET_STORY_MESSAGE})


/**
 * REDUCER
 */
export default function (state = storyMessage, action) {
	switch (action.type) {
	case STORY_SUCCESS:
		return Object.assign({}, state, {result: null})
	case STORY_NO_TITLE:
		return Object.assign({}, state, {result: 'Your story needs a title.'})
	case STORY_TOO_FEW_CHAPTERS:
		return Object.assign({}, state, {result: 'Requires more than 1 chapter.'})
	case STORY_TOO_FEW_CHARACTERS:
		return Object.assign({}, state, {result: 'Requires 10 or more characters.'})
	case RESET_STORY_MESSAGE:
		return Object.assign({}, state, {result: null})
	default:
		return state
	}
}
