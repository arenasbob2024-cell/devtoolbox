'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface EmojiItem {
  emoji: string;
  name: string;
  category: string;
}

const CATEGORIES = [
  'All', 'Smileys', 'People', 'Animals', 'Food',
  'Travel', 'Activities', 'Objects', 'Symbols', 'Flags',
];

const EMOJIS: EmojiItem[] = [
  // Smileys
  { emoji: '\u{1F600}', name: 'Grinning Face', category: 'Smileys' },
  { emoji: '\u{1F601}', name: 'Beaming Face', category: 'Smileys' },
  { emoji: '\u{1F602}', name: 'Face with Tears of Joy', category: 'Smileys' },
  { emoji: '\u{1F603}', name: 'Smiling Face Open Mouth', category: 'Smileys' },
  { emoji: '\u{1F604}', name: 'Smiling Face Squinting', category: 'Smileys' },
  { emoji: '\u{1F605}', name: 'Grinning Face Sweat', category: 'Smileys' },
  { emoji: '\u{1F606}', name: 'Squinting Face', category: 'Smileys' },
  { emoji: '\u{1F609}', name: 'Winking Face', category: 'Smileys' },
  { emoji: '\u{1F60A}', name: 'Smiling Face Blushing', category: 'Smileys' },
  { emoji: '\u{1F60D}', name: 'Heart Eyes', category: 'Smileys' },
  { emoji: '\u{1F618}', name: 'Blowing Kiss', category: 'Smileys' },
  { emoji: '\u{1F60E}', name: 'Sunglasses Face', category: 'Smileys' },
  { emoji: '\u{1F914}', name: 'Thinking Face', category: 'Smileys' },
  { emoji: '\u{1F923}', name: 'Rolling on Floor Laughing', category: 'Smileys' },
  { emoji: '\u{1F970}', name: 'Smiling Face Hearts', category: 'Smileys' },
  { emoji: '\u{1F62D}', name: 'Loudly Crying Face', category: 'Smileys' },
  { emoji: '\u{1F621}', name: 'Angry Face', category: 'Smileys' },
  { emoji: '\u{1F631}', name: 'Screaming Face', category: 'Smileys' },
  { emoji: '\u{1F634}', name: 'Sleeping Face', category: 'Smileys' },
  { emoji: '\u{1F60B}', name: 'Yummy Face', category: 'Smileys' },
  // People
  { emoji: '\u{1F44D}', name: 'Thumbs Up', category: 'People' },
  { emoji: '\u{1F44E}', name: 'Thumbs Down', category: 'People' },
  { emoji: '\u{1F44B}', name: 'Waving Hand', category: 'People' },
  { emoji: '\u{1F44F}', name: 'Clapping Hands', category: 'People' },
  { emoji: '\u{1F64F}', name: 'Folded Hands', category: 'People' },
  { emoji: '\u{1F4AA}', name: 'Flexed Biceps', category: 'People' },
  { emoji: '\u{270C}\u{FE0F}', name: 'Victory Hand', category: 'People' },
  { emoji: '\u{1F91D}', name: 'Handshake', category: 'People' },
  { emoji: '\u{1F91E}', name: 'Crossed Fingers', category: 'People' },
  { emoji: '\u{1F919}', name: 'Call Me Hand', category: 'People' },
  { emoji: '\u{1F448}', name: 'Pointing Left', category: 'People' },
  { emoji: '\u{1F449}', name: 'Pointing Right', category: 'People' },
  { emoji: '\u{1F446}', name: 'Pointing Up', category: 'People' },
  { emoji: '\u{1F447}', name: 'Pointing Down', category: 'People' },
  { emoji: '\u{270B}', name: 'Raised Hand', category: 'People' },
  // Animals
  { emoji: '\u{1F436}', name: 'Dog Face', category: 'Animals' },
  { emoji: '\u{1F431}', name: 'Cat Face', category: 'Animals' },
  { emoji: '\u{1F42D}', name: 'Mouse Face', category: 'Animals' },
  { emoji: '\u{1F439}', name: 'Hamster', category: 'Animals' },
  { emoji: '\u{1F430}', name: 'Rabbit Face', category: 'Animals' },
  { emoji: '\u{1F98A}', name: 'Fox', category: 'Animals' },
  { emoji: '\u{1F43B}', name: 'Bear', category: 'Animals' },
  { emoji: '\u{1F43C}', name: 'Panda', category: 'Animals' },
  { emoji: '\u{1F428}', name: 'Koala', category: 'Animals' },
  { emoji: '\u{1F981}', name: 'Lion', category: 'Animals' },
  { emoji: '\u{1F984}', name: 'Unicorn', category: 'Animals' },
  { emoji: '\u{1F422}', name: 'Turtle', category: 'Animals' },
  { emoji: '\u{1F433}', name: 'Whale', category: 'Animals' },
  { emoji: '\u{1F427}', name: 'Penguin', category: 'Animals' },
  { emoji: '\u{1F985}', name: 'Eagle', category: 'Animals' },
  // Food
  { emoji: '\u{1F34E}', name: 'Red Apple', category: 'Food' },
  { emoji: '\u{1F34F}', name: 'Green Apple', category: 'Food' },
  { emoji: '\u{1F353}', name: 'Strawberry', category: 'Food' },
  { emoji: '\u{1F355}', name: 'Pizza', category: 'Food' },
  { emoji: '\u{1F354}', name: 'Hamburger', category: 'Food' },
  { emoji: '\u{1F35F}', name: 'French Fries', category: 'Food' },
  { emoji: '\u{1F363}', name: 'Sushi', category: 'Food' },
  { emoji: '\u{1F370}', name: 'Cake', category: 'Food' },
  { emoji: '\u{2615}', name: 'Coffee', category: 'Food' },
  { emoji: '\u{1F37A}', name: 'Beer', category: 'Food' },
  { emoji: '\u{1F377}', name: 'Wine', category: 'Food' },
  { emoji: '\u{1F36B}', name: 'Chocolate', category: 'Food' },
  { emoji: '\u{1F369}', name: 'Donut', category: 'Food' },
  { emoji: '\u{1F32E}', name: 'Taco', category: 'Food' },
  { emoji: '\u{1F35D}', name: 'Spaghetti', category: 'Food' },
  // Travel
  { emoji: '\u{2708}\u{FE0F}', name: 'Airplane', category: 'Travel' },
  { emoji: '\u{1F697}', name: 'Car', category: 'Travel' },
  { emoji: '\u{1F680}', name: 'Rocket', category: 'Travel' },
  { emoji: '\u{1F6F8}', name: 'Flying Saucer', category: 'Travel' },
  { emoji: '\u{1F3E0}', name: 'House', category: 'Travel' },
  { emoji: '\u{1F3D6}\u{FE0F}', name: 'Beach', category: 'Travel' },
  { emoji: '\u{26F0}\u{FE0F}', name: 'Mountain', category: 'Travel' },
  { emoji: '\u{1F30D}', name: 'Globe Europe', category: 'Travel' },
  { emoji: '\u{1F30E}', name: 'Globe Americas', category: 'Travel' },
  { emoji: '\u{1F3DD}\u{FE0F}', name: 'Desert Island', category: 'Travel' },
  // Activities
  { emoji: '\u{26BD}', name: 'Soccer Ball', category: 'Activities' },
  { emoji: '\u{1F3C0}', name: 'Basketball', category: 'Activities' },
  { emoji: '\u{1F3C8}', name: 'Football', category: 'Activities' },
  { emoji: '\u{26BE}', name: 'Baseball', category: 'Activities' },
  { emoji: '\u{1F3BE}', name: 'Tennis', category: 'Activities' },
  { emoji: '\u{1F3AE}', name: 'Video Game', category: 'Activities' },
  { emoji: '\u{1F3B5}', name: 'Musical Note', category: 'Activities' },
  { emoji: '\u{1F3A8}', name: 'Artist Palette', category: 'Activities' },
  { emoji: '\u{1F3AC}', name: 'Clapper Board', category: 'Activities' },
  { emoji: '\u{1F3AF}', name: 'Bullseye', category: 'Activities' },
  // Objects
  { emoji: '\u{1F4BB}', name: 'Laptop', category: 'Objects' },
  { emoji: '\u{1F4F1}', name: 'Mobile Phone', category: 'Objects' },
  { emoji: '\u{2328}\u{FE0F}', name: 'Keyboard', category: 'Objects' },
  { emoji: '\u{1F4A1}', name: 'Light Bulb', category: 'Objects' },
  { emoji: '\u{1F50D}', name: 'Magnifying Glass', category: 'Objects' },
  { emoji: '\u{1F512}', name: 'Locked', category: 'Objects' },
  { emoji: '\u{1F513}', name: 'Unlocked', category: 'Objects' },
  { emoji: '\u{1F4E7}', name: 'Email', category: 'Objects' },
  { emoji: '\u{1F4DA}', name: 'Books', category: 'Objects' },
  { emoji: '\u{1F4F7}', name: 'Camera', category: 'Objects' },
  { emoji: '\u{231A}', name: 'Watch', category: 'Objects' },
  { emoji: '\u{1F4BE}', name: 'Floppy Disk', category: 'Objects' },
  { emoji: '\u{1F527}', name: 'Wrench', category: 'Objects' },
  { emoji: '\u{2699}\u{FE0F}', name: 'Gear', category: 'Objects' },
  { emoji: '\u{1F4CC}', name: 'Pushpin', category: 'Objects' },
  // Symbols
  { emoji: '\u{2764}\u{FE0F}', name: 'Red Heart', category: 'Symbols' },
  { emoji: '\u{1F525}', name: 'Fire', category: 'Symbols' },
  { emoji: '\u{2B50}', name: 'Star', category: 'Symbols' },
  { emoji: '\u{26A1}', name: 'Lightning', category: 'Symbols' },
  { emoji: '\u{2705}', name: 'Check Mark', category: 'Symbols' },
  { emoji: '\u{274C}', name: 'Cross Mark', category: 'Symbols' },
  { emoji: '\u{2757}', name: 'Exclamation', category: 'Symbols' },
  { emoji: '\u{2753}', name: 'Question Mark', category: 'Symbols' },
  { emoji: '\u{267B}\u{FE0F}', name: 'Recycle', category: 'Symbols' },
  { emoji: '\u{1F4AF}', name: 'Hundred Points', category: 'Symbols' },
  { emoji: '\u{1F199}', name: 'UP! Button', category: 'Symbols' },
  { emoji: '\u{1F680}', name: 'Rocket Symbol', category: 'Symbols' },
  { emoji: '\u{269B}\u{FE0F}', name: 'Atom', category: 'Symbols' },
  { emoji: '\u{262F}\u{FE0F}', name: 'Yin Yang', category: 'Symbols' },
  { emoji: '\u{267E}\u{FE0F}', name: 'Infinity', category: 'Symbols' },
  // Flags
  { emoji: '\u{1F1FA}\u{1F1F8}', name: 'United States', category: 'Flags' },
  { emoji: '\u{1F1EC}\u{1F1E7}', name: 'United Kingdom', category: 'Flags' },
  { emoji: '\u{1F1EB}\u{1F1F7}', name: 'France', category: 'Flags' },
  { emoji: '\u{1F1E9}\u{1F1EA}', name: 'Germany', category: 'Flags' },
  { emoji: '\u{1F1EF}\u{1F1F5}', name: 'Japan', category: 'Flags' },
  { emoji: '\u{1F1E8}\u{1F1F3}', name: 'China', category: 'Flags' },
  { emoji: '\u{1F1F0}\u{1F1F7}', name: 'South Korea', category: 'Flags' },
  { emoji: '\u{1F1E7}\u{1F1F7}', name: 'Brazil', category: 'Flags' },
  { emoji: '\u{1F1EE}\u{1F1F3}', name: 'India', category: 'Flags' },
  { emoji: '\u{1F1E6}\u{1F1FA}', name: 'Australia', category: 'Flags' },
  { emoji: '\u{1F1E8}\u{1F1E6}', name: 'Canada', category: 'Flags' },
  { emoji: '\u{1F1EE}\u{1F1F9}', name: 'Italy', category: 'Flags' },
  { emoji: '\u{1F1EA}\u{1F1F8}', name: 'Spain', category: 'Flags' },
  { emoji: '\u{1F1F2}\u{1F1FD}', name: 'Mexico', category: 'Flags' },
  { emoji: '\u{1F3F4}', name: 'Black Flag', category: 'Flags' },
];

function getCodePoints(emoji: string): string {
  const codePoints: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp && cp !== 0xFE0F) {
      codePoints.push('U+' + cp.toString(16).toUpperCase().padStart(4, '0'));
    }
  }
  return codePoints.join(' ');
}

function getHtmlEntity(emoji: string): string {
  const entities: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp && cp !== 0xFE0F) {
      entities.push('&#x' + cp.toString(16).toUpperCase() + ';');
    }
  }
  return entities.join('');
}

function getCssEscape(emoji: string): string {
  const escapes: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp && cp !== 0xFE0F) {
      escapes.push('\\' + cp.toString(16).toUpperCase());
    }
  }
  return escapes.join('');
}

export default function EmojiPicker() {
  const { dict } = useLang();
  const t = dict.tools['emoji-picker'];
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<EmojiItem | null>(null);
  const [recent, setRecent] = useState<EmojiItem[]>([]);

  const filtered = useMemo(() => {
    let list = EMOJIS;
    if (activeCategory !== 'All') {
      list = list.filter(e => e.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  const handleSelect = (item: EmojiItem) => {
    setSelected(item);
    setRecent(prev => {
      const filtered = prev.filter(e => e.emoji !== item.emoji);
      return [item, ...filtered].slice(0, 20);
    });
  };

  const tileStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    background: 'var(--bg-input)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="emoji-picker">
      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search emojis by name..."
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: 14,
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 16,
        flexWrap: 'wrap',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: activeCategory === cat ? 'var(--accent-blue)' : 'var(--bg-input)',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recently Used */}
      {recent.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Recently Used
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {recent.map((item, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => handleSelect(item)}
                style={{
                  ...tileStyle,
                  width: 38,
                  height: 38,
                  fontSize: 22,
                  background: selected?.emoji === item.emoji
                    ? 'rgba(59,130,246,0.15)'
                    : 'var(--bg-input)',
                  borderColor: selected?.emoji === item.emoji
                    ? 'var(--accent-blue)'
                    : 'var(--border-color)',
                }}
                title={item.name}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Emoji Grid */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {filtered.length} emojis
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
            gap: 6,
            maxHeight: 420,
            overflowY: 'auto',
            padding: 4,
          }}>
            {filtered.map((item, i) => (
              <button
                key={`${item.emoji}-${i}`}
                onClick={() => handleSelect(item)}
                style={{
                  ...tileStyle,
                  background: selected?.emoji === item.emoji
                    ? 'rgba(59,130,246,0.15)'
                    : 'var(--bg-input)',
                  borderColor: selected?.emoji === item.emoji
                    ? 'var(--accent-blue)'
                    : 'var(--border-color)',
                }}
                title={item.name}
              >
                {item.emoji}
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 40,
                color: 'var(--text-secondary)',
                fontSize: 14,
              }}>
                No emojis found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          padding: 20,
          height: 'fit-content',
          position: 'sticky',
          top: 20,
        }}>
          {selected ? (
            <>
              {/* Large Preview */}
              <div style={{
                textAlign: 'center',
                marginBottom: 16,
                padding: 16,
                background: 'var(--bg-input)',
                borderRadius: 10,
              }}>
                <div style={{ fontSize: 80, lineHeight: 1.1 }}>{selected.emoji}</div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginTop: 8,
                }}>
                  {selected.name}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  marginTop: 4,
                }}>
                  {selected.category}
                </div>
              </div>

              {/* Copy Emoji */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Emoji
                  </span>
                  <CopyButton text={selected.emoji} />
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'monospace',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}>
                  {selected.emoji}
                </div>
              </div>

              {/* Unicode */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Unicode
                  </span>
                  <CopyButton text={getCodePoints(selected.emoji)} />
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-color)',
                  wordBreak: 'break-all',
                }}>
                  {getCodePoints(selected.emoji)}
                </div>
              </div>

              {/* HTML Entity */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    HTML Entity
                  </span>
                  <CopyButton text={getHtmlEntity(selected.emoji)} />
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-color)',
                  wordBreak: 'break-all',
                }}>
                  {getHtmlEntity(selected.emoji)}
                </div>
              </div>

              {/* CSS Escape */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    CSS Escape
                  </span>
                  <CopyButton text={getCssEscape(selected.emoji)} />
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-color)',
                  wordBreak: 'break-all',
                }}>
                  {getCssEscape(selected.emoji)}
                </div>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-secondary)',
            }}>
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>
                {'\u{1F449}'}
              </div>
              <div style={{ fontSize: 14 }}>
                Click an emoji to see details
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
