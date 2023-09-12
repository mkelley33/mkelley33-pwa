import RefreshPwaProvider from '@/components/RefreshPwaProvider';
import MainContent from '@/components/MainContent';

export default function Home() {
  return (
    <main>
      <div className="p-12">
        <RefreshPwaProvider>
          <MainContent />
        </RefreshPwaProvider>
      </div>
    </main>
  );
}
