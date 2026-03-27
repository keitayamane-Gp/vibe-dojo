import { useEffect, useRef } from 'react';

interface DeclarationModalProps {
  text: string;
  onTextChange: (text: string) => void;
  onCopy: () => void;
  onClose: () => void;
  copied: boolean;
}

export function DeclarationModal({
  text,
  onTextChange,
  onCopy,
  onClose,
  copied,
}: DeclarationModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Escキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 開いたときにテキストエリアにフォーカス
  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.select();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🚀 Slack宣言文を編集</h2>
          <button className="modal-close" onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        <p className="modal-description">
          このままコピーしてSlackに貼り付けてください。自由に編集できます。
        </p>

        <textarea
          ref={textareaRef}
          className="modal-textarea"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          rows={8}
        />

        <div className="modal-actions">
          <button className="btn btn--primary modal-copy-btn" onClick={onCopy}>
            {copied ? '✅ コピーしました！' : '📋 コピーしてSlackに貼る'}
          </button>
          <button className="btn btn--ghost" onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
