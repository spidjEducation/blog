import { request } from '../utils/request';

export const removePostAsync = (postId) => () => {
	return request(`/posts/${postId}`, 'DELETE');
};
