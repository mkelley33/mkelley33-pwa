'use client';

import { MouseEvent } from 'react';

const getFadingKeyFrames = (isFadeIn: boolean) => {
  const startOpacity = isFadeIn ? 0 : 1;
  const endOpacity = startOpacity === 0 ? 1 : 0;
  return [{ opacity: startOpacity }, { opacity: endOpacity }];
}

const CopyToClipboard = () => {
  const handleCopyButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    let textToCopy = button.nextElementSibling?.firstChild?.textContent;
    // Replace the terminal prompt symbol $ in code snippets
    textToCopy = textToCopy?.replace(/\$\s{1}/g, '');
    navigator.clipboard.writeText(textToCopy!);

    const buttonText = button.querySelector('span');
    const fadeInKeyframes = getFadingKeyFrames(true);
    const fadeOutKeyFrames = getFadingKeyFrames(false);
    const duration = 500;
    const iterations = 1;

    if (buttonText) {
      buttonText.animate(fadeOutKeyFrames, { duration, iterations, easing: 'ease-out' });
      buttonText.textContent = 'Copied!'
      buttonText.animate(fadeInKeyframes, { duration, iterations, easing: 'ease-in' });

      setTimeout(() => {
        buttonText.animate(fadeOutKeyFrames, { duration, iterations, easing: 'ease-out' });
        buttonText.textContent = 'Copy';
        buttonText.animate(fadeInKeyframes, { duration, iterations, easing: 'ease-in' });
      }, 750);
    }
  }

  return (
    <button className="copy-code-button" onClick={handleCopyButtonClick}><span>Copy</span></button>
  );
}

export default CopyToClipboard;
