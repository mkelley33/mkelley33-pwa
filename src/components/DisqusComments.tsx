'use client';

import { DiscussionEmbed } from 'disqus-react';

interface IPost {
  post: {
    title: string;
  };
  slug: string;
}

const DisqusComments = ({ post, slug }: IPost) => {
  const disqusShortname = 'mkelley33';
  const disqusConfig = {
    url: `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${
      process.env.VERCEL_URL
    }/blog/${slug}`,
    identifier: slug,
    title: post.title,
  };

  return (
    <div className="mb-20">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
