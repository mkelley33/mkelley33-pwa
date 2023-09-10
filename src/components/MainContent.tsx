import profilePic from '../../images/profile-pic.webp';
import Image from 'next/image';

export default function MainContent() {
  return (
    <section>
      <h1>About me</h1>
      <Image
        src={profilePic}
        alt="Michaux Kelley Profile Pic"
        width="150"
        height="150"
        loading="lazy"
        className="float-left w-[150px] h-[150px] mr-[1rem] mb-[0.5rem]"
      />
      <p>
        I&apos;m Michaux Kelley, and for about 10 years now I&apos;ve been
        mostly a front-end software engineer, developing software primarily with{' '}
        <a href="https://react.dev/" target="react-dev">
          React
        </a>
        , using HTML5, CSS3, JavaScript, and TypeScript to build responsive web
        apps that scale and support mobile devices. Mostly, I just like helping
        people solve problems in a user-friendly way.
      </p>
      <p>
        Aside from coding, I love music (especially listening to records), play
        a few instruments, collect stamps, read mostly non-fiction, meditate,
        and write in a notebook about all the things I do&emdash;pretty much
        daily.
      </p>
      <p>
        You can view the source for this Web site on
        <a href="https://github.com/mkelley33/mkelley33-pwa" target="github">
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
