import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useApp } from '../contexts/AppContext';
import { theme } from '../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t, language, setLanguage } = useApp();

  const languages: { id: 'tj' | 'ru' | 'en'; label: string; flag: string }[] = [
    { id: 'tj', label: 'Тоҷикӣ', flag: '🇹🇯' },
    { id: 'ru', label: 'Русский', flag: '🇷🇺' },
    { id: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const handleGetStarted = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace('/(tabs)');
  };

  const greeting = language === 'en' ? 'Hello! Welcome' : language === 'ru' ? 'Привет! Добро пожаловать' : 'Салом! Хуш омадед';
  const letsGo = language === 'en' ? "Let's get started" : language === 'ru' ? 'Давайте начнём' : 'Оғоз мекунем';

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E3A5F', '#0F172A']} style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Logo & Branding */}
          <View style={styles.topSection}>
            <View style={styles.logoWrap}>
              <MaterialIcons name="flight" size={44} color="#FFF" />
            </View>
            <Text style={styles.appTitle}>HAVO CARGO</Text>
            <Text style={styles.byLine}>
              by <Text style={styles.byBrand}>SafotradeX</Text>
            </Text>

            {/* Greeting */}
            <View style={styles.greetingWrap}>
              <Text style={styles.greetingText}>{greeting}</Text>
              <Text style={styles.greetingEmoji}>👋</Text>
            </View>

            <Text style={styles.heroTitle}>{t('welcomeTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('welcomeSubtitle')}</Text>
          </View>

          {/* Language Selector */}
          <View style={styles.langSection}>
            <Text style={styles.langLabel}>{t('selectLanguage')}</Text>
            <View style={styles.langRow}>
              {languages.map((lang) => (
                <Pressable
                  key={lang.id}
                  style={[styles.langChip, language === lang.id && styles.langChipActive]}
                  onPress={() => { Haptics.selectionAsync(); setLanguage(lang.id); }}
                >
                  <Text style={styles.langFlag}>{lang.flag}</Text>
                  <Text style={[styles.langChipText, language === lang.id && styles.langChipTextActive]}>{lang.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Features Summary */}
          <View style={styles.featuresWrap}>
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: 'rgba(59,130,246,0.2)' }]}>
                <MaterialIcons name="flight" size={18} color="#60A5FA" />
              </View>
              <Text style={styles.featureText}>
                {language === 'en' ? 'Air Cargo: 3-7 days to Dushanbe' : language === 'ru' ? 'Авиа: 3-7 дней до Душанбе' : 'Ҳаво: 3-7 рӯз то Душанбе'}
              </Text>
            </View>
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: 'rgba(249,115,22,0.2)' }]}>
                <MaterialIcons name="local-shipping" size={18} color="#FB923C" />
              </View>
              <Text style={styles.featureText}>
                {language === 'en' ? 'Road Cargo: from $1/kg via Kashgar' : language === 'ru' ? 'Авто: от $1/кг через Кашгар' : 'Авто: аз $1/кг тавассути Кошғар'}
              </Text>
            </View>
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: 'rgba(37,211,102,0.2)' }]}>
                <MaterialIcons name="chat" size={18} color="#25D366" />
              </View>
              <Text style={styles.featureText}>
                {language === 'en' ? 'Order easily via WhatsApp' : language === 'ru' ? 'Заказывайте через WhatsApp' : 'Тавассути WhatsApp фармоиш диҳед'}
              </Text>
            </View>
          </View>

          {/* Get Started Button */}
          <View style={styles.bottomSection}>
            <Pressable style={styles.primaryBtn} onPress={handleGetStarted}>
              <Text style={styles.primaryBtnText}>{letsGo}</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 32 },
  topSection: { alignItems: 'center', paddingTop: 48 },
  logoWrap: { width: 80, height: 80, borderRadius: 22, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  appTitle: { fontSize: 30, fontWeight: '800', color: '#FFF', letterSpacing: 3, marginBottom: 4 },
  byLine: { fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontStyle: 'italic' },
  byBrand: { fontSize: 16, fontWeight: '700', color: '#F59E0B', fontStyle: 'italic', letterSpacing: 1 },
  greetingWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  greetingText: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  greetingEmoji: { fontSize: 24 },
  heroTitle: { fontSize: 17, fontWeight: '600', color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 24 },
  heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 6 },
  langSection: { alignItems: 'center', marginTop: 32 },
  langLabel: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 14, fontWeight: '500' },
  langRow: { flexDirection: 'row', gap: 10 },
  langChip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: theme.radiusFull, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)' },
  langChipActive: { borderColor: theme.primary, backgroundColor: theme.primary },
  langFlag: { fontSize: 16 },
  langChipText: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.65)' },
  langChipTextActive: { color: '#FFF' },
  featuresWrap: { marginTop: 32, gap: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  featureIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1, fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500', lineHeight: 20 },
  bottomSection: { marginTop: 36 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, height: 56, backgroundColor: theme.primary, borderRadius: theme.radiusMedium },
  primaryBtnText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
});
