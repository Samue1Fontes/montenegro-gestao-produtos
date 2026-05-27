type FeedbackType = 'success' | 'error' | 'loading' | 'info';

type Props = {
  type: FeedbackType;
  message: string;
};

function FeedbackMessage({ type, message }: Props) {
  const styles = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    loading: 'bg-blue-100 text-blue-800 border border-blue-200',
    info: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  };

  const icons = {
    success: '✅',
    error: '❌',
    loading: '⏳',
    info: 'ℹ️',
  };

  return (
    // Fixo no canto inferior direito — sempre visível independente do scroll
    <div
    className={`
        fixed bottom-6 right-6 z-50
        min-w-[320px]
        rounded-xl
        px-5 py-4
        text-base font-medium
        shadow-xl
        border
        flex items-center gap-2
        transition-all duration-300
        ${styles[type]}
    `}
    >
    <span className="text-lg">{icons[type]}</span>
    <span>{message}</span>
    </div>
  );
}

export default FeedbackMessage;