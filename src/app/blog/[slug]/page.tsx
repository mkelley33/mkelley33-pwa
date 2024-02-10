import './prism.css';

import { format, parseISO } from 'date-fns';

import CopyToClipboard from '@/components/CopyToClipboard';
import DisqusComments from '@/components/DisqusComments';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { Metadata } from 'next';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface IBlogPostProps {
  params: { slug: string };
}

export async function generateMetadata({ params: { slug } }: IBlogPostProps): Promise<Metadata> {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  return {
    title: `${post?.title} - mkelley33`,
    description: post?.description,
  };
}

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

const BlogPost = ({ params: { slug } }: IBlogPostProps) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  const mdxComponents: MDXComponents = {
    // Override the default <a> element to use the next/link component.
    a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
    CopyToClipboard: () => <CopyToClipboard />
  };

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <time dateTime={post.date} className="block text-xs uppercase font-bold mb-3">
          {format(parseISO(post.date), 'MMM dd, yyyy')}
        </time>
        <MDXContent components={mdxComponents} />
      </article>
      <DisqusComments post={post} slug={slug} />
    </>
  );
};

export default BlogPost;
