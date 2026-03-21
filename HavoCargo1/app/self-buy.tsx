import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { useAlert } from '@/template';
import { useApp } from '../contexts/AppContext';
import { theme } from '../constants/theme';
import { config, ShippingMethod, RoadDestination } from '../constants/config';

const WHATSAPP_URL = 'https://wa.me/message/BE2R7MOBGQTWC1';

export default function SelfBuyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, language } = useApp();
  const { showAlert } = useAlert();

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('beijing');
  const [destination, setDestination] = useState<RoadDestination>('dushanbe');

  const getWarehouseName = (wh: string) => {
    const info = config.warehouses[wh as keyof typeof config.warehouses];
    if (!info) return wh;
    if (language === 'en') return info.nameEn;
    return language === 'ru' ? info.nameRu : info.nameTj;
  };

  const getDestName = (dest: RoadDestination) => {
    const d = config.shipping.road.destinations[dest];
    if (language === 'en') return d.nameEn;
    return language === 'ru' ? d.nameRu : d.nameTj;
  };

  const copyAddress = async (address: string) => {
    await Clipboard.setStringAsync(address);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showAlert(t('copied'));
  };

  const openWhatsApp = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Linking.openURL(WHATSAPP_URL);
  };

  // Step 1: Choose shipping method
  if (!shippingMethod) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <MaterialIcons name="close" size={24} color={theme.textPrimary} />
          </Pressable>
          <Text style={styles.title}>{t('selfBuyTitle')}</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.methodContent}>
          <Text style={styles.methodQuestion}>{t('chooseShippingMethod')}</Text>

          <Pressable style={styles.methodCard} onPress={() => { Haptics.selectionAsync(); setShippingMethod('air'); setSelectedWarehouse('beijing'); }}>
            <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.methodGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={styles.methodIconWrap}>
                <MaterialIcons name="flight" size={32} color="#FFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>{t('airCargo')}</Text>
                <Text style={styles.methodDesc}>{t('airCargoDesc')}</Text>
                <View style={styles.methodBadgeRow}>
                  <View style={styles.methodBadge}><Text style={styles.methodBadgeText}>3-7 {t('days')}</Text></View>
                  <View style={styles.methodBadge}><Text style={styles.methodBadgeText}>100 {t('somoni')}/kg</Text></View>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.methodCard} onPress={() => { Haptics.selectionAsync(); setShippingMethod('road'); }}>
            <LinearGradient colors={['#F97316', '#EA580C']} style={styles.methodGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={styles.methodIconWrap}>
                <MaterialIcons name="local-shipping" size={32} color="#FFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>{t('roadCargo')}</Text>
                <Text style={styles.methodDesc}>{t('roadCargoDesc')}</Text>
                <View style={styles.methodBadgeRow}>
                  <View style={styles.methodBadge}><Text style={styles.methodBadgeText}>12-30 {t('days')}</Text></View>
                  <View style={styles.methodBadge}><Text style={styles.methodBadgeText}>$1/kg</Text></View>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isRoad = shippingMethod === 'road';
  const warehouseInfo = isRoad ? config.warehouses.kashgar : config.warehouses[selectedWarehouse as 'xian' | 'beijing'];

  const steps = [t('selfStep1'), t('selfStep2'), t('selfStep3'), t('selfStep4')];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => setShippingMethod(null)} style={styles.closeBtn}>
            <MaterialIcons name="arrow-back" size={24} color={theme.textPrimary} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>{t('selfBuyTitle')}</Text>
            <View style={[styles.methodTag, isRoad ? styles.methodTagRoad : styles.methodTagAir]}>
              <MaterialIcons name={isRoad ? 'local-shipping' : 'flight'} size={12} color="#FFF" />
              <Text style={styles.methodTagText}>{isRoad ? t('roadTag') : t('airTag')}</Text>
            </View>
          </View>
          <View style={{ width: 44 }} />
        </View>

        {/* How it works */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>{t('howItWorks')}</Text>
          {steps.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={[styles.stepNum, isRoad && { backgroundColor: '#F97316' }]}>
                <Text style={styles.stepNumText}>{idx + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Road disclaimer */}
        {isRoad ? (
          <View style={styles.disclaimerBox}>
            <MaterialIcons name="info" size={18} color={theme.accent} />
            <Text style={styles.disclaimerText}>{t('roadDisclaimer')}</Text>
          </View>
        ) : null}

        {/* Road: Destination selection */}
        {isRoad ? (
          <>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('destination')}</Text></View>
            <View style={styles.destRow}>
              {(['dushanbe', 'khorog'] as RoadDestination[]).map((dest) => {
                const isSelected = destination === dest;
                return (
                  <Pressable key={dest} style={[styles.destPill, isSelected && styles.destPillActive]} onPress={() => { Haptics.selectionAsync(); setDestination(dest); }}>
                    <MaterialIcons name="location-on" size={16} color={isSelected ? '#FFF' : theme.textSecondary} />
                    <Text style={[styles.destPillText, isSelected && { color: '#FFF' }]}>{getDestName(dest)}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : null}

        {/* Air: Warehouse Selection */}
        {!isRoad ? (
          <>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('selectWarehouse')}</Text></View>
            <View style={styles.warehouseRow}>
              {(['beijing', 'xian'] as const).map((wh) => {
                const isSelected = selectedWarehouse === wh;
                return (
                  <Pressable key={wh} style={[styles.warehouseOption, isSelected && styles.warehouseOptionActive]} onPress={() => { Haptics.selectionAsync(); setSelectedWarehouse(wh); }}>
                    <MaterialIcons name="warehouse" size={24} color={isSelected ? theme.primary : theme.textTertiary} />
                    <Text style={[styles.warehouseOptionText, isSelected && { color: theme.primary, fontWeight: '700' }]}>{getWarehouseName(wh)}</Text>
                    {isSelected ? <MaterialIcons name="check-circle" size={18} color={theme.primary} /> : null}
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : null}

        {/* Warehouse Address with Copy */}
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>{t('warehouseAddress')}</Text>
          <Text style={styles.addressText}>{warehouseInfo.address}</Text>
          <Pressable style={[styles.copyBtn, isRoad && { backgroundColor: '#FFF7ED' }]} onPress={() => copyAddress(warehouseInfo.address)}>
            <MaterialIcons name="content-copy" size={16} color={isRoad ? theme.accent : theme.primary} />
            <Text style={[styles.copyBtnText, isRoad && { color: theme.accent }]}>{t('copyAddress')}</Text>
          </Pressable>
        </View>

        {/* Important Note */}
        <View style={styles.importantBox}>
          <View style={styles.importantHeader}>
            <MaterialIcons name="warning" size={18} color={theme.warning} />
            <Text style={styles.importantTitle}>{t('importantNote')}</Text>
          </View>
          <Text style={styles.importantText}>{isRoad ? t('importantNoteTextRoad') : t('importantNoteText')}</Text>
        </View>

        {/* Send to WhatsApp */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <Pressable style={styles.whatsAppBtn} onPress={openWhatsApp}>
            <LinearGradient colors={['#25D366', '#128C7E']} style={styles.whatsAppGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <FontAwesome5 name="whatsapp" size={22} color="#FFF" />
              <Text style={styles.whatsAppBtnText}>{t('sendToWhatsApp')}</Text>
            </LinearGradient>
          </Pressable>
          <Text style={styles.whatsAppHint}>
            {language === 'en' ? 'Send your order screenshot & tracking number via WhatsApp' : language === 'ru' ? 'Отправьте скриншот заказа и трек-номер через WhatsApp' : 'Скриншоти фармоиш ва рақами трекро тавассути WhatsApp фиристед'}
          </Text>
        </View>

        {/* Video instruction note */}
        <Pressable style={styles.videoBox} onPress={() => { Haptics.selectionAsync(); Linking.openURL('https://drive.google.com/file/d/1fDDLpkv1XkoOIdfFJPzknkSYRyWMOSeH/view?usp=drivesdk'); }}>
          <MaterialIcons name="play-circle-outline" size={24} color={theme.primary} />
          <Text style={styles.videoText}>{t('watchVideo')}</Text>
          <MaterialIcons name="chevron-right" size={20} color={theme.textTertiary} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundSecondary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  closeBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: theme.radiusFull },
  title: { fontSize: 18, fontWeight: '700', color: theme.textPrimary },
  methodTag: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: theme.radiusFull },
  methodTagAir: { backgroundColor: theme.primary },
  methodTagRoad: { backgroundColor: theme.accent },
  methodTagText: { fontSize: 10, fontWeight: '700', color: '#FFF' },
  methodContent: { flex: 1, paddingHorizontal: 16, paddingTop: 24, gap: 16 },
  methodQuestion: { fontSize: 20, fontWeight: '800', color: theme.textPrimary, marginBottom: 8, textAlign: 'center' },
  methodCard: { borderRadius: theme.radiusLarge, overflow: 'hidden', ...theme.shadowMedium },
  methodGradient: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 14 },
  methodIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  methodTitle: { fontSize: 18, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  methodDesc: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 8 },
  methodBadgeRow: { flexDirection: 'row', gap: 8 },
  methodBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: theme.radiusFull, paddingHorizontal: 10, paddingVertical: 4 },
  methodBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
  stepsCard: { marginHorizontal: 16, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, padding: 16, ...theme.shadowLight },
  stepsTitle: { fontSize: 15, fontWeight: '700', color: theme.textPrimary, marginBottom: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontSize: 13, fontWeight: '700', color: '#FFF' },
  stepText: { flex: 1, fontSize: 13, color: theme.textSecondary, lineHeight: 18, paddingTop: 4 },
  disclaimerBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginHorizontal: 16, marginTop: 12, padding: 14, backgroundColor: '#FFF7ED', borderRadius: theme.radiusMedium, borderLeftWidth: 3, borderLeftColor: theme.accent },
  disclaimerText: { flex: 1, fontSize: 12, color: theme.textSecondary, lineHeight: 18 },
  sectionHeader: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: theme.textPrimary },
  destRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  destPill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, backgroundColor: theme.surface, borderRadius: theme.radiusFull, borderWidth: 1.5, borderColor: theme.border },
  destPillActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  destPillText: { fontSize: 14, fontWeight: '600', color: theme.textSecondary },
  warehouseRow: { paddingHorizontal: 16, gap: 8 },
  warehouseOption: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, borderWidth: 1.5, borderColor: theme.border, marginBottom: 8 },
  warehouseOptionActive: { borderColor: theme.primary, backgroundColor: theme.infoLight },
  warehouseOptionText: { flex: 1, fontSize: 14, fontWeight: '500', color: theme.textSecondary },
  addressBox: { marginHorizontal: 16, marginTop: 4, padding: 14, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, borderWidth: 1, borderColor: theme.border },
  addressLabel: { fontSize: 13, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 },
  addressText: { fontSize: 13, color: theme.textPrimary, lineHeight: 20, marginBottom: 10 },
  copyBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: theme.infoLight, borderRadius: theme.radiusFull },
  copyBtnText: { fontSize: 12, fontWeight: '600', color: theme.primary },
  importantBox: { marginHorizontal: 16, marginTop: 12, padding: 14, backgroundColor: theme.warningLight, borderRadius: theme.radiusMedium, borderLeftWidth: 3, borderLeftColor: theme.warning },
  importantHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  importantTitle: { fontSize: 13, fontWeight: '700', color: theme.textPrimary },
  importantText: { fontSize: 12, color: theme.textSecondary, lineHeight: 18 },
  whatsAppBtn: { borderRadius: theme.radiusMedium, overflow: 'hidden' },
  whatsAppGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, height: 56 },
  whatsAppBtnText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  whatsAppHint: { fontSize: 12, color: theme.textTertiary, textAlign: 'center', marginTop: 8, lineHeight: 17 },
  videoBox: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 16, marginTop: 16, padding: 14, backgroundColor: theme.infoLight, borderRadius: theme.radiusMedium },
  videoText: { flex: 1, fontSize: 14, fontWeight: '600', color: theme.primary },
});
