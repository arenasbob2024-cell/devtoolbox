'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function TextConverter() {
  const { dict } = useLang();
  const t = dict.tools['text-converter'];
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionType, setConversionType] = useState('lowercase');
  
  const convertText = (text: string, type: string): string => {
    switch (type) {
      case 'lowercase':
        return text.toLowerCase();
      case 'uppercase':
        return text.toUpperCase();
      case 'titlecase':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'alternating':
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      case 'inverse':
        return text.split('').map(char => 
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        ).join('');
      case 'sentence':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default:
        return text;
    }
  };
  
  const handleConvert = () => {
    const converted = convertText(inputText, conversionType);
    setOutputText(converted);
  };
  
  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="text-converter"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Conversion Type */}
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            {t.conversionType}:
          </label>
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              fontSize: 14,
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="lowercase">{t.lowercase}</option>
            <option value="uppercase">{t.uppercase}</option>
            <option value="titlecase">{t.titleCase}</option>
            <option value="sentence">{t.sentenceCase}</option>
            <option value="alternating">{t.alternating}</option>
            <option value="inverse">{t.inverseCase}</option>
          </select>
        </div>
        
        {/* Input */}
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            {t.inputText}:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{
              width: '100%',
              height: 150,
              padding: 12,
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'monospace',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        
        {/* Convert Button */}
        <button
          onClick={handleConvert}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          {t.convertButton}
        </button>
        
        {/* Output */}
        {outputText && (
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              {t.outputText}:
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                value={outputText}
                readOnly
                style={{
                  width: '100%',
                  height: 150,
                  padding: 12,
                  paddingRight: 50,
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'monospace',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
              />
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <CopyButton text={outputText} />
              </div>
            </div>
          </div>
        )}
        
        {/* Features */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: 20,
          borderRadius: 8,
          marginTop: 20,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            {t.featuresTitle}
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
            <li>{t.feature1}</li>
            <li>{t.feature2}</li>
            <li>{t.feature3}</li>
            <li>{t.feature4}</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}