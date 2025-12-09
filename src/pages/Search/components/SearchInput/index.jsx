import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

function SearchInput({ value, onChange, onSearch }) {
    const { t } = useTranslation('search');
    const [inputValue, setInputValue] = useState(value || '');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue !== value) {
                onChange?.(inputValue);
                if (inputValue.trim()) {
                    onSearch?.(inputValue.trim());
                }
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, value, onChange, onSearch]);

    // Sync with external value
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleClear = useCallback(() => {
        setInputValue('');
        onChange?.('');
    }, [onChange]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('placeholder')}
                className="pl-10 pr-10 h-11 bg-secondary/50 border-none rounded-xl focus-visible:ring-1"
            />
            {inputValue && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
                >
                    <X className="h-3 w-3 text-muted-foreground" />
                </button>
            )}
        </div>
    );
}

export default SearchInput;
