import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useApp } from '../contexts/AppContext';
import { theme } from '../constants/theme';

const WHATSAPP_URL = 'https://wa.me/message/BE2R7MOBGQTWC1';

export default function HelpBuyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, language } = useApp();

  const openWhatsApp = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Linking.openURL(WHATSAPP_URL);
  };

  const steps = [
    language === 'en' ? 'Find the product on Pinduoduo, Taobao or 1688' : language === 'ru' ? 'Найдите товар на Pinduoduo, Taobao или 1688' : 'Молро дар Pinduoduo, Taobao ё 1688 ёбед',
    language === 'en' ? 'Copy the product link or take a screenshot' : language === 'ru' ? 'Скопируйте ссылку или сделайте скриншот' : 'Линки молро нусхабардорӣ ё скриншот гиред',
    language === 'en' ? 'Send it to us via WhatsApp below' : language === 'ru' ? 'Отправьте нам через WhatsApp ниже' : 'Тавассути WhatsApp дар поён фиристед',
    language === 'en' ? 'We buy and deliver to you!' : language === 'ru' ? 'Мы покупаем и доставляем вам!' : 'Мо мехарем ва ба шумо мерасонем!',
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <MaterialIcons name="close" size={24} color={theme.textPrimary} />
          </Pressable>
          <Text style={styles.title}>{t('helpBuyTitle')}</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* How it works */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>{t('howItWorks')}</Text>
          {steps.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>{idx + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* What to send reminder */}
        <View style={styles.reminderCard}>
          <MaterialIcons name="checklist" size={20} color={theme.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.reminderTitle}>
              {language === 'en' ? 'What to send us:' : language === 'ru' ? 'Что отправить нам:' : 'Чӣ фиристонед:'}
            </Text>
            <Text style={styles.reminderText}>
              {language === 'en'
                ? '• Product link or screenshot\n• Quantity, color/size\n• Your name, phone & city'
                : language === 'ru'
                ? '• Ссылку или скриншот товара\n• Количество, цвет/размер\n• Ваше имя, телефон и город'
                : '• Линк ё скриншоти мол\n• Миқдор, ранг/андоза\n• Ном, телефон ва шаҳри шумо'}
            </Text>
          </View>
        </View>

        {/* Video Instructions */}
        <Pressable style={styles.videoBox} onPress={() => { Haptics.selectionAsync(); Linking.openURL('https://drive.google.com/file/d/1Jv-4xKO1OwI45HCg0aChrVcHp1eBJR4V/view?usp=drivesdk'); }}>
          <MaterialIcons name="play-circle-outline" size={24} color={theme.primary} />
          <Text style={styles.videoText}>{t('watchVideo')}</Text>
          <MaterialIcons name="chevron-right" size={20} color={theme.textTertiary} />
        </Pressable>

        {/* Send to WhatsApp */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Pressable style={styles.whatsAppBtn} onPress={openWhatsApp}>
            <View style={styles.whatsAppInner}>
              <FontAwesome5 name="whatsapp" size={24} color="#FFF" />
              <Text style={styles.whatsAppBtnText}>{t('sendHelpRequest')}</Text>
            </View>
          </Pressable>
        </View>

        {/* Pricing Info */}
        <View style={styles.pricingCard}>
          <View style={styles.pricingHeader}>
            <MaterialIcons name="payments" size={20} color="#8B5CF6" />
            <Text style={styles.pricingTitle}>{t('pricingTitle')}</Text>
          </View>
          <View style={styles.pricingList}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingDot}>{'\u2022'}</Text>
              <Text style={styles.pricingText}>{t('productPriceInfo')}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingDot}>{'\u2022'}</Text>
              <Text style={styles.pricingText}>{t('deliveryToDb')}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingDot}>{'\u2022'}</Text>
              <Text style={styles.pricingText}>{t('procurementFee')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundSecondary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  closeBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: theme.radiusFull },
  title: { fontSize: 18, fontWeight: '700', color: theme.textPrimary },
  stepsCard: { marginHorizontal: 16, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, padding: 16, ...theme.shadowLight },
  stepsTitle: { fontSize: 15, fontWeight: '700', color: theme.textPrimary, marginBottom: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontSize: 13, fontWeight: '700', color: '#FFF' },
  stepText: { flex: 1, fontSize: 13, color: theme.textSecondary, lineHeight: 18, paddingTop: 4 },
  reminderCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginHorizontal: 16, marginTop: 14, padding: 14, backgroundColor: theme.infoLight, borderRadius: theme.radiusMedium },
  reminderTitle: { fontSize: 14, fontWeight: '700', color: theme.primary, marginBottom: 4 },
  reminderText: { fontSize: 13, color: theme.primary, lineHeight: 20 },
  whatsAppBtn: { borderRadius: theme.radiusMedium, overflow: 'hidden' },
  whatsAppInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, height: 56, backgroundColor: '#25D366', borderRadius: theme.radiusMedium },
  whatsAppBtnText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  pricingCard: { marginHorizontal: 16, marginTop: 20, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, padding: 16, borderWidth: 1, borderColor: theme.border },
  pricingHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  pricingTitle: { fontSize: 15, fontWeight: '700', color: theme.textPrimary },
  pricingList: { gap: 6 },
  pricingRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  pricingDot: { fontSize: 14, color: theme.textSecondary, lineHeight: 20 },
  pricingText: { flex: 1, fontSize: 13, color: theme.textSecondary, lineHeight: 20 },
  videoBox: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 16, marginTop: 16, padding: 14, backgroundColor: theme.infoLight, borderRadius: theme.radiusMedium },
  videoText: { flex: 1, fontSize: 14, fontWeight: '600', color: theme.primary },
});
