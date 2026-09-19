'use client';

import React from 'react';
import {
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Mail,
  Check,
  Copy,
  Code2,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({
  content,
  isUser = false,
}) => {
  if (!content) return null;

  // Preprocess text: fix split links like [label]\n(url), normalize newlines
  const preprocessed = content
    .replace(/\[([^\]]+)\]\s*\n\s*\((https?:\/\/[^\s)]+)\)/g, '[$1]($2)')
    .replace(/\r\n/g, '\n');

  // Split into code blocks and normal text blocks
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const blocks: Array<{ type: 'code' | 'text'; lang?: string; content: string }> = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(preprocessed)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({
        type: 'text',
        content: preprocessed.slice(lastIndex, match.index),
      });
    }
    blocks.push({
      type: 'code',
      lang: match[1],
      content: match[2],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < preprocessed.length) {
    blocks.push({
      type: 'text',
      content: preprocessed.slice(lastIndex),
    });
  }

  return (
    <div className={`space-y-2 text-xs sm:text-[13px] leading-relaxed break-words font-sans ${isUser ? 'text-white' : 'text-neutral-200'}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'code') {
          return <CodeBlock key={bIdx} lang={block.lang} code={block.content} />;
        }
        return <TextBlock key={bIdx} text={block.content} isUser={isUser} />;
      })}
    </div>
  );
};

// Code block with copy button
const CodeBlock: React.FC<{ lang?: string; code: string }> = ({ lang, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950/90 text-neutral-200 font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900/90 border-b border-neutral-800 text-[11px] text-neutral-400">
        <span className="flex items-center gap-1 font-medium">
          <Code2 className="w-3 h-3 text-cyan-400" />
          {lang || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-neutral-200 transition cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[11.5px] leading-normal text-neutral-300">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

// Text block parser: handles headings, lists, paragraphs
const TextBlock: React.FC<{ text: string; isUser: boolean }> = ({ text, isUser }) => {
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const lines = trimmed.split('\n');

        // Check for Markdown headings
        if (lines.length === 1) {
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={pIdx} className="font-semibold text-cyan-300 text-xs sm:text-[13px] mt-2 mb-0.5">
                {renderInline(trimmed.replace(/^###\s+/, ''), isUser)}
              </h4>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={pIdx} className="font-bold text-cyan-400 text-sm sm:text-[14px] mt-2.5 mb-1 flex items-center gap-1.5">
                {renderInline(trimmed.replace(/^##\s+/, ''), isUser)}
              </h3>
            );
          }
          if (trimmed.startsWith('# ')) {
            return (
              <h2 key={pIdx} className="font-bold text-white text-base mt-3 mb-1.5">
                {renderInline(trimmed.replace(/^#\s+/, ''), isUser)}
              </h2>
            );
          }
        }

        // Check if this paragraph is a list
        const isList =
          lines.length > 0 &&
          lines.some((line) => /^[-*•🔹🔸✔✓]\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim())) &&
          lines.every((line) => {
            const l = line.trim();
            return (
              l.length === 0 ||
              /^[-*•🔹🔸✔✓]\s+/.test(l) ||
              /^\d+\.\s+/.test(l)
            );
          });

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1 my-1.5 pl-1">
              {lines.map((line, lIdx) => {
                const l = line.trim();
                if (!l) return null;
                const cleanLine = l.replace(/^[-*•🔹🔸✔✓]\s+/, '').replace(/^\d+\.\s+/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400 select-none mt-1 text-[9px] flex-shrink-0">●</span>
                    <span className="flex-1">{renderInline(cleanLine, isUser)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Standard paragraph (with soft linebreaks)
        return (
          <p key={pIdx} className="my-1.5 leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderInline(line, isUser)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
};

// Check if a URL or text matches social/portfolio links
function getLinkDetails(url: string, label?: string) {
  const lowerUrl = url.toLowerCase();
  const lowerLabel = (label || '').toLowerCase();

  // GitHub
  if (lowerUrl.includes('github.com')) {
    const handle = lowerUrl.split('github.com/')[1]?.replace(/\/$/, '') || 'GitHub';
    return {
      type: 'github',
      label: label && label !== url ? label : `github.com/${handle}`,
      icon: <Github className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" />,
      className:
        'bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-200 hover:text-white border-neutral-700/80',
    };
  }

  // LinkedIn
  if (lowerUrl.includes('linkedin.com')) {
    return {
      type: 'linkedin',
      label: label && label !== url ? label : 'LinkedIn Profile',
      icon: <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />,
      className:
        'bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 hover:text-white border-blue-700/50',
    };
  }

  // Portfolio / Vercel Live Apps
  if (
    lowerUrl.includes('pmppiyas.vercel.app') ||
    lowerLabel.includes('portfolio') ||
    lowerUrl.includes('.vercel.app')
  ) {
    const host = lowerUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return {
      type: 'portfolio',
      label: label && label !== url ? label : host,
      icon: <Globe className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-200 transition-colors" />,
      className:
        'bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 hover:text-white border-cyan-700/50',
    };
  }

  // Mailto link
  if (lowerUrl.startsWith('mailto:')) {
    const email = url.replace(/^mailto:/i, '');
    return {
      type: 'email',
      label: label && label !== url ? label : email,
      icon: <Mail className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
      className:
        'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white border-emerald-700/50',
    };
  }

  // WhatsApp / Phone
  if (lowerUrl.includes('wa.me') || lowerUrl.includes('whatsapp') || lowerUrl.startsWith('tel:')) {
    const cleanNum = label || url.replace(/^https?:\/\/wa\.me\//i, '+').replace(/^tel:/i, '');
    return {
      type: 'whatsapp',
      label: cleanNum,
      icon: <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
      className:
        'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white border-emerald-700/50',
    };
  }

  // General URL
  return {
    type: 'general',
    label: label || url,
    icon: <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />,
    className:
      'bg-neutral-800/70 hover:bg-neutral-700/80 text-cyan-400 hover:text-cyan-200 border-neutral-700/60',
  };
}

// Render rich interactive pill for special links (GitHub, LinkedIn, Portfolio, Vercel)
const SocialLinkPill: React.FC<{ url: string; label?: string }> = ({ url, label }) => {
  const details = getLinkDetails(url, label);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-lg border transition-all text-xs font-medium group shadow-sm no-underline cursor-pointer ${details.className}`}
      title={`Open ${url}`}
    >
      {details.icon}
      <span>{details.label}</span>
      <ExternalLink className="w-2.5 h-2.5 text-neutral-400 group-hover:text-white opacity-70 group-hover:opacity-100 transition" />
    </a>
  );
};

// Render Email pill
const EmailPill: React.FC<{ email: string }> = ({ email }) => {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-emerald-100 border border-emerald-700/40 transition-all text-xs font-medium group shadow-sm no-underline cursor-pointer"
      title={`Send email to ${email}`}
    >
      <Mail className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-200 transition-colors" />
      <span>{email}</span>
    </a>
  );
};

// Inline parser for bold, italic, links, emails, code
function renderInline(line: string, isUser: boolean): React.ReactNode {
  if (!line) return null;

  // Regex for inline tokens:
  // 1. Markdown link: [text](url)
  // 2. Bold with email or text: \*\*(.*?)\*\*
  // 3. Raw URL: https?:\/\/[^\s<)]+
  // 4. Email: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
  // 5. Inline code: `([^`]+)`
  // 6. Italic: \*([^*]+)\*
  const tokenRegex =
    /(\[[^\]]+\]\((?:https?:\/\/|mailto:|tel:)[^\s)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s<)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|`[^`]+`|\*[^*]+\*)/g;

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIdx) {
      parts.push(line.slice(lastIdx, match.index));
    }

    const token = match[0];

    // 1. Markdown Link: [label](url)
    const mdLinkMatch = token.match(/^\[([^\]]+)\]\(((?:https?:\/\/|mailto:|tel:)[^\s)]+)\)$/);
    if (mdLinkMatch) {
      const label = mdLinkMatch[1];
      const url = mdLinkMatch[2];
      parts.push(<SocialLinkPill key={match.index} url={url} label={label} />);
      lastIdx = match.index + token.length;
      continue;
    }

    // 2. Bold: **text**
    if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2).trim();

      // If bold contains an email address (e.g. **pmppiyas@gmail.com**)
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inner)) {
        parts.push(<EmailPill key={match.index} email={inner} />);
      } else {
        parts.push(
          <strong
            key={match.index}
            className={`font-semibold tracking-wide ${
              isUser ? 'text-white font-bold' : 'text-white font-semibold'
            }`}
          >
            {renderInline(inner, isUser)}
          </strong>
        );
      }
      lastIdx = match.index + token.length;
      continue;
    }

    // 3. Raw URL
    if (token.startsWith('http://') || token.startsWith('https://')) {
      parts.push(<SocialLinkPill key={match.index} url={token} />);
      lastIdx = match.index + token.length;
      continue;
    }

    // 4. Email address
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(token)) {
      parts.push(<EmailPill key={match.index} email={token} />);
      lastIdx = match.index + token.length;
      continue;
    }

    // 5. Inline code
    if (token.startsWith('`') && token.endsWith('`')) {
      const codeText = token.slice(1, -1);
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-neutral-800/80 border border-neutral-700/60 font-mono text-[11px] text-cyan-300"
        >
          {codeText}
        </code>
      );
      lastIdx = match.index + token.length;
      continue;
    }

    // 6. Italic
    if (token.startsWith('*') && token.endsWith('*')) {
      const inner = token.slice(1, -1);
      parts.push(
        <em key={match.index} className="italic text-neutral-300">
          {inner}
        </em>
      );
      lastIdx = match.index + token.length;
      continue;
    }

    parts.push(token);
    lastIdx = match.index + token.length;
  }

  if (lastIdx < line.length) {
    parts.push(line.slice(lastIdx));
  }

  return parts;
}
