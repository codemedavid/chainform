import React, { useRef, useEffect, useCallback } from 'react';
import {
    Bold, Italic, Underline, Strikethrough,
    AlignLeft, AlignCenter, AlignRight,
    List, ListOrdered, Type, Palette,
    Heading1, Heading2, Heading3, Undo, Redo, RemoveFormatting
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: string;
}

const FONT_FAMILIES = [
    { label: 'Default', value: '' },
    { label: 'Sans-serif', value: 'Arial, Helvetica, sans-serif' },
    { label: 'Serif', value: 'Georgia, Times New Roman, serif' },
    { label: 'Monospace', value: 'Courier New, monospace' },
    { label: 'Cursive', value: 'Comic Sans MS, cursive' },
    { label: 'Inter', value: 'Inter, sans-serif' },
];

const FONT_SIZES = [
    { label: 'Small', value: '2' },
    { label: 'Normal', value: '3' },
    { label: 'Large', value: '5' },
    { label: 'Extra Large', value: '6' },
];

const TEXT_COLORS = [
    '#000000', '#374151', '#6B7280', '#DC2626',
    '#EA580C', '#D97706', '#16A34A', '#2563EB',
    '#7C3AED', '#DB2777', '#0891B2', '#4F46E5',
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Start typing your description...',
    minHeight = '160px',
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalChange = useRef(false);
    const colorInputRef = useRef<HTMLInputElement>(null);

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && !isInternalChange.current) {
            if (editorRef.current.innerHTML !== value) {
                editorRef.current.innerHTML = value || '';
            }
        }
        isInternalChange.current = false;
    }, [value]);

    const handleInput = useCallback(() => {
        if (editorRef.current) {
            isInternalChange.current = true;
            const html = editorRef.current.innerHTML;
            onChange(html === '<br>' ? '' : html);
        }
    }, [onChange]);

    const execCommand = (command: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
        handleInput();
    };

    const handleFontFamily = (fontFamily: string) => {
        if (fontFamily) {
            execCommand('fontName', fontFamily);
        }
    };

    const handleFontSize = (size: string) => {
        execCommand('fontSize', size);
    };

    const handleColorChange = (color: string) => {
        execCommand('foreColor', color);
    };

    const handleHeading = (tag: string) => {
        execCommand('formatBlock', tag);
    };

    const ToolbarButton: React.FC<{
        onClick: () => void;
        title: string;
        children: React.ReactNode;
        active?: boolean;
    }> = ({ onClick, title, children, active }) => (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault(); // Prevent losing selection
                onClick();
            }}
            title={title}
            className={`p-1.5 rounded transition-all duration-150 ${active
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
        >
            {children}
        </button>
    );

    const ToolbarDivider = () => (
        <div className="w-px h-6 bg-gray-200 mx-0.5" />
    );

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-theme-accent focus-within:border-theme-accent transition-all">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 px-2 py-1.5 flex flex-wrap items-center gap-0.5">
                {/* Undo / Redo */}
                <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
                    <Undo className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
                    <Redo className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Font Family */}
                <select
                    onChange={(e) => handleFontFamily(e.target.value)}
                    className="text-xs bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-theme-accent cursor-pointer hover:border-gray-300"
                    title="Font Family"
                    defaultValue=""
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {FONT_FAMILIES.map((font) => (
                        <option key={font.label} value={font.value} style={{ fontFamily: font.value || 'inherit' }}>
                            {font.label}
                        </option>
                    ))}
                </select>

                {/* Font Size */}
                <select
                    onChange={(e) => handleFontSize(e.target.value)}
                    className="text-xs bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-theme-accent cursor-pointer hover:border-gray-300"
                    title="Font Size"
                    defaultValue="3"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {FONT_SIZES.map((size) => (
                        <option key={size.value} value={size.value}>
                            {size.label}
                        </option>
                    ))}
                </select>

                <ToolbarDivider />

                {/* Text Formatting */}
                <ToolbarButton onClick={() => execCommand('bold')} title="Bold (Ctrl+B)">
                    <Bold className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('italic')} title="Italic (Ctrl+I)">
                    <Italic className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('underline')} title="Underline (Ctrl+U)">
                    <Underline className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('strikeThrough')} title="Strikethrough">
                    <Strikethrough className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Text Color */}
                <div className="relative group">
                    <ToolbarButton
                        onClick={() => colorInputRef.current?.click()}
                        title="Text Color"
                    >
                        <Palette className="w-3.5 h-3.5" />
                    </ToolbarButton>
                    <input
                        ref={colorInputRef}
                        type="color"
                        className="absolute opacity-0 w-0 h-0 pointer-events-none"
                        onChange={(e) => handleColorChange(e.target.value)}
                    />
                    {/* Quick Colors Dropdown */}
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 hidden group-hover:grid grid-cols-4 gap-1 z-50 min-w-[120px]">
                        {TEXT_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleColorChange(color);
                                }}
                                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                </div>

                <ToolbarDivider />

                {/* Headings */}
                <ToolbarButton onClick={() => handleHeading('h1')} title="Heading 1">
                    <Heading1 className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleHeading('h2')} title="Heading 2">
                    <Heading2 className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleHeading('h3')} title="Heading 3">
                    <Heading3 className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => handleHeading('p')} title="Normal Text">
                    <Type className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Lists */}
                <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
                    <List className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
                    <ListOrdered className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Text Alignment */}
                <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
                    <AlignLeft className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
                    <AlignCenter className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
                    <AlignRight className="w-3.5 h-3.5" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Clear Formatting */}
                <ToolbarButton onClick={() => execCommand('removeFormat')} title="Clear Formatting">
                    <RemoveFormatting className="w-3.5 h-3.5" />
                </ToolbarButton>
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="px-3 py-2 text-sm text-gray-900 outline-none overflow-y-auto rich-text-editor"
                style={{ minHeight, maxHeight: '400px' }}
                data-placeholder={placeholder}
                suppressContentEditableWarning
            />
        </div>
    );
};

export default RichTextEditor;
