import React, { useState } from 'react';
import { KdsButton } from 'react-mx-web-components';
import { copyToClipboard } from '../utils/clipboard';

export default function CommandBlock({ command }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(command);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="command-block">
      <div className="command-header">
        <span className="language-badge">bash</span>
        <KdsButton variant="tertiary" size="small" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </KdsButton>
      </div>
      <pre><code>{command}</code></pre>
    </div>
  );
}
