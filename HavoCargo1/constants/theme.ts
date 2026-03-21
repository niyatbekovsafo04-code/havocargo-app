export const theme = {
  // Primary - Trustworthy Blue
  primary: '#2563EB',
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',

  // Accent - Commerce Orange
  accent: '#F97316',
  accentLight: '#FDBA74',
  accentDark: '#EA580C',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',

  // Semantic
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#E2E8F0',

  // Gradients
  gradientPrimary: ['#2563EB', '#1D4ED8'] as const,
  gradientAccent: ['#F97316', '#EA580C'] as const,
  gradientDark: ['#0F172A', '#1E293B'] as const,
  gradientSuccess: ['#10B981', '#059669'] as const,

  // Shadows
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shadowHeavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  // Border Radius
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  radiusXL: 20,
  radiusFull: 9999,

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export type Theme = typeof theme;
