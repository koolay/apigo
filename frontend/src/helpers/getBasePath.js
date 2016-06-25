import Token from './token'
import { baseAlias } from '../config'

/**
 * 
 * @return {string}        
 */
export default function getBasePath() {
	let token = Token.get()
	if(token){
		token = '/' + token
	}
	return `${token}${baseAlias}`
}