import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, type Post } from 'contentlayer/generated';
import Pagination from '@/components/Pagination';
import { memo } from 'react';

// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598?permalink_comment_id=3413141#gistcomment-3413141
function paginate(current: number, total: number) {
  const center = [current - 2, current - 1, current, current + 1, current + 2],
    filteredCenter: Array<string | number> = center.filter(
      (p) => p > 1 && p < total
    ),
    includeThreeLeft = current === 5,
    includeThreeRight = current === total - 4,
    includeLeftDots = current > 5,
    includeRightDots = current < total - 4;

  if (includeThreeLeft) filteredCenter.unshift(2);
  if (includeThreeRight) filteredCenter.push(total - 1);

  if (includeLeftDots) filteredCenter.unshift('...');
  if (includeRightDots) filteredCenter.push('...');

  return [1, ...filteredCenter, total];
}

const MAX_LIMIT = 50;

function PostCard(post: Post) {
  return (
    <article className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={post.url}>{post.title}</Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <p className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0">
        {post.description}
      </p>
    </article>
  );
}

const BlogList = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const page = +(searchParams?.page ?? 1);
  const limit = +(searchParams?.limit ?? 5);

  if (typeof limit !== 'undefined' && limit > 50) {
    throw new Error(`Max limit of ${MAX_LIMIT} blog posts exceeded.`);
  }

  const isFirstPage = page === 1;
  const totalItems = allPosts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const isLastPage = page * limit >= totalPages * limit;
  const pageStart = (page - 1 < 0 ? 0 : page - 1) * limit;
  const pageEnd = Math.min(pageStart + limit - 1, totalItems - 1);
  const postsSlice = posts.slice(pageStart, pageEnd + 1);
  const pagination = paginate(page, totalPages);
  const nextPage = `/blog/?page=${page + 1}`;
  const prevPage = `/blog/?page=${page - 1}`;

  return (
    <section>
      <h1>Blog Posts by Michaux Kelley</h1>
      {postsSlice.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}

      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        pagination={pagination}
        page={page}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </section>
  );
};

export default memo(BlogList);
