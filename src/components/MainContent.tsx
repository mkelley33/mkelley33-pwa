import Image from 'next/image';
import profilePic from '../../images/profile-pic.webp';

export default function MainContent() {
  return (
    <section>
      <h1>About me</h1>
      <Image
        src={profilePic}
        alt="Michaux Kelley Profile Pic"
        width="75"
        loading="lazy"
        className="float-left border-4 border-gray-600 shadow-gray-800 shadow-sm rounded-full sm:w-[75px] sm:h-auto md:w-[150px] md:h-auto mr-[1.5rem]"
        style={{ shapeOutside: 'circle()' }}
      />
      <p>
        I&apos;m Michaux Kelley, and for over 9 years I&apos;ve worked as a senior front-end software engineer,
        developing primarily with{' '}
        <a href="https://react.dev/" target="react-dev">
          React
        </a>
        , while using HTML5, CSS3, JavaScript, and TypeScript to build responsive Web apps that scale and support a
        variety of devices. I enjoy assisting people by solving complex problems in a user-friendly way.
      </p>
      <p>
        Aside from coding, I love listening to music, playing musical instruments, collecting stamps, reading
        non-fiction, meditating, art, and journaling.
      </p>
      <p>
        You can view the source for this Web site on{' '}
        <a href="https://github.com/mkelley33/mkelley33-pwa" target="github">
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
