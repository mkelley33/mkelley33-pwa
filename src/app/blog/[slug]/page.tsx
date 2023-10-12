import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import './prism.css';
import DisqusComments from '@/components/DisqusComments';

interface IBlogPostProps {
  params: { slug: string };
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

const BlogPost = ({ params: { slug } }: IBlogPostProps) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  const mdxComponents: MDXComponents = {
    // Override the default <a> element to use the next/link component.
    a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  };

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <time
          dateTime={post.date}
          className="block text-xs uppercase font-bold mb-3"
        >
          {format(parseISO(post.date), 'MMM dd, yyyy')}
        </time>
        <MDXContent components={mdxComponents} />
      </article>
      <DisqusComments post={post} slug={slug} />
    </>
  );
};

export default BlogPost;
