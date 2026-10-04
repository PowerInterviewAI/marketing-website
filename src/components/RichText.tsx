import React from 'react';

/**
 * Renders a message with `**emphasis**` markers. Copy that bolds a phrase
 * mid-sentence cannot be split into fixed JSX pieces once it is translated -
 * the phrase moves with the grammar - so the markers travel inside the string
 * and the translator decides where they go.
 */
export const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className="font-medium text-foreground">
          {part}
        </span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    )}
  </>
);

export default RichText;
