import RefreshPwaProvider from '@/components/PwaLifecycle';
import MainContent from '@/components/MainContent';
import PwaLifecycle from '@/components/PwaLifecycle';

export default function Home() {
  return (
    <>
      <PwaLifecycle />
      <MainContent />
    </>
  );
}
