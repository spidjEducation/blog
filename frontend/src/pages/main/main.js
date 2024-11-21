import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination, PostCard } from './components/';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { Search } from './components';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [lastPage, setLastPage] = useState(1);
	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			if (posts.error) {
				return;
			}
			setPosts(posts);
			setLastPage(lastPage);
		});
	}, [page, searchPhrase, shouldSearch]);

	const startDelaySearch = useMemo(() => debounce(setShouldSearch, 2000));

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};
	return (
		<div className={className}>
			<div className="post-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(({ id, title, publishedAt, comments, imageUrl }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								publishedAt={publishedAt}
								commentsCount={comments.length}
							></PostCard>
						))}
					</div>
				) : (
					<div className="no-post-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination
					limit={PAGINATION_LIMIT}
					setPage={setPage}
					page={page}
					lastPage={lastPage}
				/>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-post-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
