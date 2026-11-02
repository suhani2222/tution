tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                serif: ['Newsreader', 'Georgia', 'serif'],
                sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                paper: {
                    DEFAULT: '#FAF8F5',
                    warm: '#F3EFEA',
                    deep: '#EAE4DC',
                    border: '#E6E0D6',
                    hairline: '#D8D0C5'
                },
                ink: {
                    DEFAULT: '#1C1917',
                    secondary: '#57534E',
                    muted: '#78716C'
                },
                terracotta: {
                    DEFAULT: '#C2410C',
                    hover: '#9A3412',
                    tint: '#FFF7ED',
                    border: '#FDBA74'
                },
                forest: {
                    DEFAULT: '#14532D',
                    hover: '#166534',
                    tint: '#F0FDF4',
                    border: '#BBF7D0'
                }
            }
        }
    }
};
