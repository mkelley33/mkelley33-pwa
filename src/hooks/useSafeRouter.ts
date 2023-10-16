import { useRouter } from 'next/navigation';

const useSafeRouter = () => {
  try {
    return useRouter();
  } catch (error) {
    return {
      push: () => {},
    };
  }
};

export default useSafeRouter;
