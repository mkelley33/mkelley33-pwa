import RefreshPwaProvider from '@/components/RefreshPwaProvider';
import MainContent from '@/components/MainContent';

export default function Home() {
  return (
    <RefreshPwaProvider>
      <MainContent />
    </RefreshPwaProvider>
  );
}
