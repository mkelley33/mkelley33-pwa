import profilePic from '../../images/profile-pic.webp';
import Image from 'next/image';

export default function MainContent() {
  return (
    <section>
      <h1 className="text-3xl mb-7">About me</h1>
      <Image
        src={profilePic}
        alt="Michaux Kelley Profile Pic"
        width="75"
        loading="lazy"
        className="float-left sm:w-[75px] sm:h-auto md:w-[150px] md:h-auto mr-[1rem] mb-[0.5rem]"
      />
      <p className="md:text-xl mb-7">
        I&apos;m Michaux Kelley, and for over 10 years now I&apos;ve been a
        front-end software engineer, developing software primarily with{' '}
        <a href="https://react.dev/" target="react-dev">
          React
        </a>
        , using HTML5, CSS3, JavaScript, and TypeScript to build responsive web
        apps that scale and support a variety of devices. I enjoy assisting
        people by solving complex problems in a user-friendly way.
      </p>
      <p className="md:text-xl mb-7">
        Aside from coding, I love listening to music, playing musical
        instruments, collecting stamps, reading non-fiction, meditating, and
        journaling.
      </p>
      <p className="md:text-xl mb-7">
        You can view the source for this Web site on{' '}
        <a href="https://github.com/mkelley33/mkelley33-pwa" target="github">
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
